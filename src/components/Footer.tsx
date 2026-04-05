import prisma from "@/lib/prisma";
import FooterContent from "./FooterContent";

type FooterProduct = {
  id: number;
  name: string;
};

const getFooterProducts = async (): Promise<FooterProduct[]> => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return products;
  } catch {
    return [];
  }
};

export default async function Footer() {
  const products = await getFooterProducts();
  return <FooterContent products={products} />;
}
