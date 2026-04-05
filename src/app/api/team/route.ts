import prisma from "@/lib/prisma";
import {
  type LocalizedText,
  getLocalizedText,
  toLocalizedTextPayload,
} from "@/src/helpers/i18n";
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

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: members.map(toApiMember),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const imageFile = formData.get("image");
    let imageUrl = "";

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "team");
      imageUrl = result.secure_url;
    }

    const created = await prisma.teamMember.create({
      data: {
        name: member.name.en,
        nameI18n: member.name,
        role: member.post.en,
        roleI18n: member.post,
        description: member.description.en,
        descriptionI18n: member.description,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiMember(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team member",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
