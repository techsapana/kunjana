import prisma from "@/lib/prisma";
import {
  type LocalizedText,
  getLocalizedText,
  toLocalizedTextPayload,
} from "@/src/helpers/i18n";
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

export async function GET(request: Request) {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const hasAuthorization = Boolean(request.headers.get("authorization"));
    const cacheControl = hasAuthorization
      ? "no-store"
      : "public, max-age=60, s-maxage=60, stale-while-revalidate=120";

    return NextResponse.json(
      {
        success: true,
        data: partners.map(toApiPartner),
      },
      {
        headers: {
          "Cache-Control": cacheControl,
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partners",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const imageFile = formData.get("image");

    if (!(imageFile instanceof File) || imageFile.size <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploaded = await uploadtocloudinary(buffer, "partners");

    const created = await prisma.partner.create({
      data: {
        name: partner.name.en,
        nameI18n: partner.name,
        imageUrl: uploaded.secure_url,
        description: partner.description.en,
        descriptionI18n: partner.description,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiPartner(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
