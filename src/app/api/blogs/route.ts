import prisma from "@/lib/prisma";
import {
  type LocalizedText,
  getLocalizedText,
  toLocalizedTextPayload,
} from "@/src/helpers/i18n";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type BlogPayload = {
  title: LocalizedText;
  description: LocalizedText;
  content: LocalizedText;
};

const toApiBlog = (blog: {
  id: number;
  title: string;
  titleI18n: unknown;
  description: string;
  descriptionI18n: unknown;
  content: string;
  contentI18n: unknown;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => {
  const titleI18n = getLocalizedText(blog.titleI18n, blog.title);
  const descriptionI18n = getLocalizedText(
    blog.descriptionI18n,
    blog.description,
  );
  const contentI18n = getLocalizedText(blog.contentI18n, blog.content);

  return {
    id: blog.id,
    title: titleI18n.en,
    titleI18n,
    description: descriptionI18n.en,
    descriptionI18n,
    content: contentI18n.en,
    contentI18n,
    imageUrl: blog.imageUrl,
    image: blog.imageUrl,
    images: blog.imageUrl ? [blog.imageUrl] : [],
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

const parseBlogPayload = (rawValue: FormDataEntryValue | null): BlogPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid blog payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<BlogPayload>;

  return {
    title: toLocalizedTextPayload(parsed.title),
    description: toLocalizedTextPayload(parsed.description),
    content: toLocalizedTextPayload(parsed.content),
  };
};

const getFirstImageFile = (formData: FormData) => {
  const files = formData.getAll("images");

  for (const value of files) {
    if (value instanceof File && value.size > 0) {
      return value;
    }
  }

  const singleImage = formData.get("image");
  if (singleImage instanceof File && singleImage.size > 0) {
    return singleImage;
  }

  return null;
};

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: blogs.map(toApiBlog),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const blog = parseBlogPayload(formData.get("blog"));

    if (!blog.title.en || !blog.description.en || !blog.content.en) {
      return NextResponse.json(
        {
          success: false,
          message: "English title, description and content are required",
        },
        { status: 400 },
      );
    }

    const imageFile = getFirstImageFile(formData);

    if (!imageFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const result = await uploadtocloudinary(buffer, "blogs");

    const created = await prisma.blog.create({
      data: {
        title: blog.title.en,
        titleI18n: blog.title,
        description: blog.description.en,
        descriptionI18n: blog.description,
        content: blog.content.en,
        contentI18n: blog.content,
        imageUrl: result.secure_url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiBlog(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
