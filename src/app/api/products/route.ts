import prisma from "@/lib/prisma";
import {
  type LocalizedStringList,
  type LocalizedText,
  getLocalizedStringList,
  getLocalizedText,
  toLocalizedStringListPayload,
  toLocalizedTextPayload,
} from "@/src/helpers/i18n";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PRODUCT_CONTENT_MAX_CHARS = 140;
const PRODUCT_FEATURES_MAX_ITEMS = 8;

const clampProductContent = (
  value: string,
  maxChars = PRODUCT_CONTENT_MAX_CHARS,
) => value.slice(0, maxChars);

const normalizeProductFeatures = (
  features: string[],
  maxItems = PRODUCT_FEATURES_MAX_ITEMS,
) =>
  features
    .map((feature) => feature.trim())
    .filter((feature) => feature.length > 0)
    .slice(0, maxItems);

type ProductPayload = {
  name: LocalizedText;
  content: LocalizedText;
  features: LocalizedStringList;
  description: LocalizedText;
  price: number;
};

const toApiProduct = (product: {
  id: number;
  name: string;
  nameI18n: unknown;
  content: string;
  contentI18n: unknown;
  features: string[];
  featuresI18n: unknown;
  description: string;
  descriptionI18n: unknown;
  price: number;
  images: Array<{ id: number; url: string; productId: number }>;
  createdAt: Date;
  updatedAt: Date;
}) => {
  const nameI18n = getLocalizedText(product.nameI18n, product.name);
  const contentI18n = getLocalizedText(product.contentI18n, product.content);
  const descriptionI18n = getLocalizedText(
    product.descriptionI18n,
    product.description,
  );
  const featuresI18n = getLocalizedStringList(
    product.featuresI18n,
    product.features,
  );

  return {
    id: product.id,
    name: nameI18n.en,
    nameI18n,
    content: contentI18n.en,
    contentI18n,
    features: featuresI18n.en,
    featuresI18n,
    description: descriptionI18n.en,
    descriptionI18n,
    price: product.price,
    images: product.images,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

const parseProductPayload = (
  rawValue: FormDataEntryValue | null,
): ProductPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid product payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<ProductPayload>;
  const localizedContent = toLocalizedTextPayload(parsed.content);
  const localizedFeatures = toLocalizedStringListPayload(parsed.features);

  return {
    name: toLocalizedTextPayload(parsed.name),
    content: {
      en: clampProductContent(localizedContent.en).trim(),
      ne: clampProductContent(localizedContent.ne).trim(),
    },
    features: {
      en: normalizeProductFeatures(localizedFeatures.en),
      ne: normalizeProductFeatures(localizedFeatures.ne),
    },
    description: toLocalizedTextPayload(parsed.description),
    price: Number(parsed.price ?? 0),
  };
};

const extractImageFiles = (formData: FormData) => {
  const values = formData.getAll("images");
  return values.filter(
    (value): value is File => value instanceof File && value.size > 0,
  );
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

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: products.map(toApiProduct),
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const product = parseProductPayload(formData.get("product"));
    const imageFiles = extractImageFiles(formData);

    if (!product.name.en || !product.description.en || !product.content.en) {
      return NextResponse.json(
        {
          success: false,
          message: "English name, short content and description are required",
        },
        { status: 400 },
      );
    }

    if (product.features.en.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one feature is required",
        },
        { status: 400 },
      );
    }

    if (!Number.isFinite(product.price) || product.price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid price is required",
        },
        { status: 400 },
      );
    }

    const uploadResults = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadtocloudinary(buffer, "products");
      }),
    );

    const created = await prisma.product.create({
      data: {
        name: product.name.en,
        nameI18n: product.name,
        content: product.content.en,
        contentI18n: product.content,
        features: product.features.en,
        featuresI18n: product.features,
        description: product.description.en,
        descriptionI18n: product.description,
        price: product.price,
        images: {
          create: uploadResults.map((item) => ({ url: item.secure_url })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiProduct(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid id query parameter is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    await Promise.all(
      existing.images.map((image) => deleteCloudinaryFile(image.url)),
    );

    return NextResponse.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
