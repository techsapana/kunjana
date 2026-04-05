"use server";

import {
  getLocalizedStringList,
  getLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";
import { headers } from "next/headers";
import ProductDetailContent from "./ProductDetailContent";
import { notFound } from "next/navigation";

type ProductDetail = {
  id: number;
  name: LocalizedText;
  content: LocalizedText;
  features: LocalizedStringList;
  description: LocalizedText;
  price: number;
  images: string[];
};

const resolveProduct = async (id: number): Promise<ProductDetail | null> => {
  try {
    const requestHeaders = await headers();
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
    const host =
      requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

    if (!host) {
      return null;
    }

    const response = await fetch(`${protocol}://${host}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      data?: {
        id: number;
        name: string;
        nameI18n?: unknown;
        content: string;
        contentI18n?: unknown;
        features: string[];
        featuresI18n?: unknown;
        description: string;
        descriptionI18n?: unknown;
        price: number;
        images: Array<{ url: string }>;
      };
    };

    if (!payload.data) {
      return null;
    }

    return {
      id: payload.data.id,
      name: getLocalizedText(payload.data.nameI18n, payload.data.name),
      content: getLocalizedText(payload.data.contentI18n, payload.data.content),
      features: getLocalizedStringList(
        payload.data.featuresI18n,
        payload.data.features ?? [],
      ),
      description: getLocalizedText(
        payload.data.descriptionI18n,
        payload.data.description,
      ),
      price: payload.data.price,
      images: payload.data.images.map((image) => image.url),
    };
  } catch {
    return null;
  }
};

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  const product = await resolveProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
