import prisma from "@/lib/prisma";
import ProductCard from "@/src/components/ProductCard";
import PaginationControls from "@/src/components/PaginationControls";
import SectionWrapper from "@/src/components/SectionWrapper";
import { Translated } from "@/src/components/TranslationComponents";
import {
  getLocalizedStringList,
  getLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";

const getProducts = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize;
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { images: true },
      }),
      prisma.product.count(),
    ]);
    return {
      products: products.map((product) => ({
        id: product.id,
        name: getLocalizedText(product.nameI18n, product.name),
        content: getLocalizedText(
          product.contentI18n,
          product.content || product.description,
        ),
        features: getLocalizedStringList(
          product.featuresI18n,
          product.features ?? [],
        ),
        price: product.price,
        imageUrl: product.images[0]?.url,
      })),
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch {
    return { products: [], totalPages: 0 };
  }
};

export default async function ProductsPage(props: {
  searchParams?: Promise<{ page?: string }> | { page?: string };
}) {
  // Await searchParams to support both Next.js 14 (object) and Next.js 15 (promise)
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const pageSize = 9;

  const { products, totalPages } = await getProducts(page, pageSize);

  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="Products" ne="उत्पादनहरू" />
          </span>
          <h1 className="section-title mt-4">
            <Translated
              en="Our signature supplement range"
              ne="हाम्रो विशेष पूरक उत्पादन श्रृंखला"
            />
          </h1>
          <p className="section-subtitle mt-4">
            <Translated
              en="Scientifically formulated products for poultry digestion, immunity, growth performance, and long-term flock resilience."
              ne="कुखुराको पाचन, प्रतिरक्षा, वृद्धि कार्यक्षमता र दीर्घकालीन बगाल सुदृढताका लागि वैज्ञानिक रूपमा तयार गरिएका उत्पादनहरू।"
            />
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10 md:py-14">
        {products.length === 0 ? (
          <div className="soft-panel p-10 text-center">
            <h2 className="text-2xl text-[#1e3a0f]">
              <Translated
                en="No products available yet"
                ne="अहिलेसम्म कुनै उत्पादन उपलब्ध छैन"
              />
            </h2>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              <Translated
                en="Products will appear here once they are added in the admin panel."
                ne="एडमिन प्यानलमा उत्पादन थपिएपछि यहाँ देखिनेछन्।"
              />
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name as LocalizedText}
                content={product.content as LocalizedText}
                features={product.features as LocalizedStringList}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <PaginationControls totalPages={totalPages} currentPage={page} />
        )}
      </SectionWrapper>
    </>
  );
}
