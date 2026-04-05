import prisma from "@/lib/prisma";
import {
  type LocalizedText,
  getLocalizedText,
  toLocalizedTextPayload,
} from "@/src/helpers/i18n";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PartnerPayload = {
  name: LocalizedText;
  description: LocalizedText;
};

const toApiPartner = (partner: {
  id: number;
  name: string;
  nameI18n: unknown;
  imageUrl: string;
  description: string;
  descriptionI18n: unknown;
  createdAt: Date;
  updatedAt: Date;
}) => {
  const nameI18n = getLocalizedText(partner.nameI18n, partner.name);
  const descriptionI18n = getLocalizedText(
    partner.descriptionI18n,
    partner.description,
  );

  return {
    id: partner.id,
    name: nameI18n.en,
    nameI18n,
    imageUrl: partner.imageUrl,
    description: descriptionI18n.en,
    descriptionI18n,
    createdAt: partner.createdAt,
    updatedAt: partner.updatedAt,
  };
};

const parseId = (value: string) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid partner id");
  }

  return parsed;
};

const parsePartnerPayload = (
  rawValue: FormDataEntryValue | null,
): PartnerPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid partner payload");
  }

  const payload = JSON.parse(rawValue) as Partial<PartnerPayload>;

  return {
    name: toLocalizedTextPayload(payload.name),
    description: toLocalizedTextPayload(payload.description),
  };
};

const extractPublicIdFromUrl = (fileUrl: string) => {
  const marker = "/upload/";
  const markerIndex = fileUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const pathWithVersion = fileUrl.slice(markerIndex + marker.length);
  const cleaned = pathWithVersion.replace(/^v\d+\//, "");
  const dotIndex = cleaned.lastIndexOf(".");

  if (dotIndex === -1) {
    return cleaned;
  }

  return cleaned.slice(0, dotIndex);
};

const deleteCloudinaryFile = async (fileUrl: string) => {
  const publicId = extractPublicIdFromUrl(fileUrl);

  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore Cloudinary delete failures.
  }
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const partnerId = parseId(id);

    const partner = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!partner) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiPartner(partner),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const partnerId = parseId(id);

    const formData = await request.formData();
    const partner = parsePartnerPayload(formData.get("partner"));

    if (!partner.name.en) {
      return NextResponse.json(
        {
          success: false,
          message: "English name is required",
        },
        { status: 400 },
      );
    }

    if (!partner.description.en) {
      return NextResponse.json(
        {
          success: false,
          message: "English description is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    let nextImageUrl = existing.imageUrl;
    const imageFile = formData.get("image");

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await uploadtocloudinary(buffer, "partners");
      nextImageUrl = uploaded.secure_url;
    }

    const updated = await prisma.partner.update({
      where: { id: partnerId },
      data: {
        name: partner.name.en,
        nameI18n: partner.name,
        description: partner.description.en,
        descriptionI18n: partner.description,
        imageUrl: nextImageUrl,
      },
    });

    if (nextImageUrl !== existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      data: toApiPartner(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const partnerId = parseId(id);

    const existing = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    await prisma.partner.delete({
      where: { id: partnerId },
    });

    await deleteCloudinaryFile(existing.imageUrl);

    return NextResponse.json({
      success: true,
      message: "Partner deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
