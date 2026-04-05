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

type TeamPayload = {
  name: LocalizedText;
  post: LocalizedText;
  description: LocalizedText;
};

const toApiMember = (member: {
  id: number;
  name: string;
  nameI18n: unknown;
  role: string;
  roleI18n: unknown;
  description: string;
  descriptionI18n: unknown;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => {
  const nameI18n = getLocalizedText(member.nameI18n, member.name);
  const roleI18n = getLocalizedText(member.roleI18n, member.role);
  const descriptionI18n = getLocalizedText(
    member.descriptionI18n,
    member.description,
  );

  return {
    id: member.id,
    name: nameI18n.en,
    nameI18n,
    post: roleI18n.en,
    postI18n: roleI18n,
    role: roleI18n.en,
    roleI18n,
    description: descriptionI18n.en,
    descriptionI18n,
    image: member.imageUrl,
    imageUrl: member.imageUrl,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
};

const parseId = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid member id");
  }
  return parsed;
};

const parseMemberPayload = (
  rawValue: FormDataEntryValue | null,
): TeamPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid member payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<TeamPayload>;

  return {
    name: toLocalizedTextPayload(parsed.name),
    post: toLocalizedTextPayload(parsed.post),
    description: toLocalizedTextPayload(parsed.description),
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
    const memberId = parseId(id);

    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiMember(member),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team member",
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
    const memberId = parseId(id);
    const formData = await request.formData();
    const member = parseMemberPayload(formData.get("member"));

    if (!member.name.en || !member.post.en || !member.description.en) {
      return NextResponse.json(
        {
          success: false,
          message:
            "English name, post and description are required for team member",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 },
      );
    }

    let nextImageUrl = existing.imageUrl;
    const imageFile = formData.get("image");

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "team");
      nextImageUrl = result.secure_url;
    }

    const updated = await prisma.teamMember.update({
      where: { id: memberId },
      data: {
        name: member.name.en,
        nameI18n: member.name,
        role: member.post.en,
        roleI18n: member.post,
        description: member.description.en,
        descriptionI18n: member.description,
        imageUrl: nextImageUrl,
      },
    });

    if (nextImageUrl !== existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      data: toApiMember(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update team member",
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
    const memberId = parseId(id);

    const existing = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 },
      );
    }

    await prisma.teamMember.delete({
      where: { id: memberId },
    });

    await deleteCloudinaryFile(existing.imageUrl);

    return NextResponse.json({
      success: true,
      message: "Team member deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete team member",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
