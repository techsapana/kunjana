"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import SectionHeader from "@/src/components/SectionHeader";
import { useTranslation } from "@/src/hooks/useTranslation";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";

import Image from "next/image";

interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  nameI18n?: LocalizedText;
  description: string;
  price: number;
  images: ProductImage[];
}

interface Partner {
  id: number;
  name: string;
  imageUrl: string;
}

const MainSection = () => {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`, {
          cache: "force-cache",
        });
        const json = await res.json();
        setProducts(Array.isArray(json?.data) ? json.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    const fetchPartners = async () => {
      try {
        const res = await fetch(`/api/partners`, {
          cache: "no-store",
        });
        const json = await res.json();
        const normalizedPartners = Array.isArray(json?.data)
          ? json.data.filter(
              (partner: Partner) =>
                typeof partner?.id === "number" &&
                typeof partner?.imageUrl === "string" &&
                partner.imageUrl.length > 0,
            )
          : [];

        setPartners(normalizedPartners);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartners([]);
      } finally {
        setPartnersLoading(false);
      }
    };

    fetchProducts();
    fetchPartners();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white pt-16 md:pt-24">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-[110px]" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-lime-200/50 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div>
            <SectionHeader
              kicker={text("Product Portfolio", "उत्पादन पोर्टफोलियो")}
              title={text("Explore our", "हाम्रा")}
              highlight={text("Products", "उत्पादनहरू")}
              description={text(
                "NaturePure Organics delivers dependable cabling solutions designed for domestic, commercial, and industrial installation needs.",
                "नेचरप्योर अर्गानिक्सले घरेलु, व्यावसायिक र औद्योगिक आवश्यकताका लागि भरपर्दा समाधान प्रदान गर्छ।",
              )}
            />
          </div>
          <p className="mt-4 max-w-4xl rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-600 sm:text-base">
            {text(
              "Curated lines for residential, commercial, and infrastructure-grade installations.",
              "आवासीय, व्यावसायिक र पूर्वाधार-स्तरका स्थापना आवश्यकताका लागि तयार गरिएका उत्पादन लाइनहरू।",
            )}
          </p>
        </div>

        <div className="mb-16">
          <h3 className="mb-6">
            <SectionHeader
              kicker={text("Highlights", "हाइलाइट")}
              title={text("Featured Product", "विशेष उत्पादन")}
              highlight={text("Lines", "लाइनहरू")}
            />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {productsLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`course-skeleton-${index}`}
                  className="w-64 h-80 rounded-2xl bg-emerald-50 animate-pulse border border-emerald-100"
                />
              ))}

            {!productsLoading && featuredProducts.length === 0 && (
              <p className="text-slate-500 col-span-full text-center">
                {text(
                  "No products available at the moment.",
                  "हाल कुनै उत्पादन उपलब्ध छैन।",
                )}
              </p>
            )}

            {!productsLoading &&
              featuredProducts.map((product) => {
                const subtitle =
                  typeof product.price === "number"
                    ? `${language === "en" ? "NPR" : "रु."} ${product.price}`
                    : text("Available now", "अहिले उपलब्ध");

                return (
                  <div key={product.id} className="w-full">
                    <Card
                      imageSrc={product.images?.[0]?.url || "/placeholder.svg"}
                      title={pickLocalizedText(
                        product.nameI18n ?? product.name,
                        language,
                      )}
                      subtitle={subtitle}
                      href={`/products/${product.id}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mb-2">
          <div id="partners" className="scroll-mt-30 mb-8">
            <SectionHeader
              kicker={text("Trusted Network", "विश्वसनीय नेटवर्क")}
              title={text("Our", "हाम्रा")}
              highlight={text("Partners", "साझेदार")}
              align="center"
            />
          </div>

          {partnersLoading ? (
            <div className="flex gap-6 overflow-hidden max-w-7xl mx-auto px-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-48 h-32 bg-emerald-50 rounded-2xl shrink-0 border border-emerald-100"
                />
              ))}
            </div>
          ) : partners.length === 0 ? (
            <p className="text-center text-slate-500">
              {text("No partners available.", "कुनै साझेदार उपलब्ध छैन।")}
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center w-48 h-32 bg-white border border-emerald-100 rounded-2xl shadow-sm p-2"
                >
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name || "Partner"}
                    width={160}
                    height={80}
                    unoptimized
                    className="max-w-full max-h-20 object-contain rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
