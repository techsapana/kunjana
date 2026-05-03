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

import prisma from "@/lib/prisma";

const resolveProduct = async (id: number): Promise<ProductDetail | null> => {
  try {
    const productData = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!productData) {
      return null;
    }

    return {
      id: productData.id,
      name: getLocalizedText(productData.nameI18n, productData.name),
      content: getLocalizedText(productData.contentI18n, productData.content),
      features: getLocalizedStringList(
        productData.featuresI18n,
        productData.features ?? [],
      ),
      description: getLocalizedText(
        productData.descriptionI18n,
        productData.description,
      ),
      price: productData.price,
      images: productData.images.map((image) => image.url),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
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
