"use client";

import EditorViewer from "@/src/components/EditorViewer";
import ProductImageCarousel from "@/src/components/ProductImageCarousel";
import SectionWrapper from "@/src/components/SectionWrapper";
import {
  pickLocalizedStringList,
  pickLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";
import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";

type ProductDetailContentProps = {
  product: {
    id: number;
    name: LocalizedText;
    content: LocalizedText;
    features: LocalizedStringList;
    description: LocalizedText;
    price: number;
    images: string[];
  };
};

const isLikelyBlockNoteJson = (value: string) => {
  const trimmed = value.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
};

const getParagraphs = (value: string) =>
  value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export default function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const { language } = useTranslation();
  const name = pickLocalizedText(product.name, language);
  const content = pickLocalizedText(product.content, language);
  const description = pickLocalizedText(product.description, language);
  const features = pickLocalizedStringList(product.features, language);

  const descriptionParagraphs = getParagraphs(description);
  const primaryImage = product.images[0] ?? null;
  const hasCarousel = product.images.length > 1;

  return (
    <>
      <SectionWrapper className="pb-2 pt-30 md:pt-34">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/products"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
          >
            {language === "en" ? "Back to Products" : "उत्पादनहरूमा फर्कनुहोस्"}
          </Link>

          <div className="rounded-full border border-[#7bbf42]/20 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#4a8c28] uppercase shadow-[0_8px_24px_rgba(30,58,15,0.06)] backdrop-blur-sm">
            {language === "en" ? "NaturePure Organics" : "नेचरप्योर अर्गानिक्स"}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0 md:pt-0">
        <article className="relative overflow-hidden rounded-4xl border border-[#7bbf42]/18 bg-[radial-gradient(circle_at_top_right,rgba(123,191,66,0.16),transparent_24%),linear-gradient(145deg,#fdfdf9_0%,#f2f7e8_52%,#fbf5ec_100%)] p-6 shadow-[0_20px_60px_rgba(30,58,15,0.08)] md:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-12 top-16 h-40 w-40 rounded-full bg-[#d9ebb8]/55 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 right-8 h-52 w-52 rounded-full bg-[#efe1c1]/60 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
            {hasCarousel ? (
              <ProductImageCarousel images={product.images} name={name} />
            ) : primaryImage ? (
              <div className="relative overflow-hidden rounded-4xl border border-[#7bbf42]/20 bg-[#eff6df] shadow-[0_18px_50px_rgba(30,58,15,0.12)]">
                <div className="pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-[#badf8a]/45 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-[#e8d8b5]/55 blur-3xl" />
                <div className="absolute left-5 top-5 z-10 rounded-full border border-white/50 bg-white/75 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#2d5a1b] uppercase backdrop-blur-sm">
                  {language === "en" ? "Product Image" : "उत्पादन चित्र"}
                </div>
                <div className="relative h-110 w-full md:h-135">
                  <Image
                    src={primaryImage}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="relative flex min-h-110 items-center justify-center overflow-hidden rounded-4xl border border-[#7bbf42]/20 bg-linear-to-br from-[#eff7df] via-[#f7f2e8] to-[#dcebc6] p-8 text-center shadow-[0_18px_50px_rgba(30,58,15,0.12)]">
                <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-[#cfe7b0]/50 blur-3xl" />
                <div className="relative max-w-sm space-y-3">
                  <span className="section-tag">
                    {language === "en" ? "Gallery" : "ग्यालेरी"}
                  </span>
                  <h3 className="text-3xl text-[#1e3a0f]">
                    {language === "en"
                      ? "Images coming soon"
                      : "तस्बिरहरू चाँडै आउँदैछन्"}
                  </h3>
                  <p className="text-sm leading-7 text-[#4b5f3d] md:text-base">
                    {language === "en"
                      ? `${name} will appear here once the product gallery is uploaded.`
                      : `उत्पादन ग्यालेरी अपलोड भएपछि ${name} यहाँ देखिनेछ।`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <div>
                <span className="section-tag">
                  {language === "en" ? "Featured Product" : "विशेष उत्पादन"}
                </span>

                <h1 className="mt-5 text-4xl leading-tight text-[#1e3a0f] md:text-5xl xl:text-6xl">
                  {name}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-[#4a8c28] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_12px_28px_rgba(74,140,40,0.28)]">
                    {language === "en" ? "NPR" : "रु."}{" "}
                    {product.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 rounded-[1.75rem] border border-[#7bbf42]/20 bg-[#f8fbf0]/90 p-6 shadow-[0_14px_36px_rgba(30,58,15,0.06)] md:grid-cols-[1fr_auto] md:items-stretch">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold tracking-[0.14em] text-[#4a8c28] uppercase">
                    {language === "en"
                      ? "Ready to order?"
                      : "अर्डर गर्न तयार हुनुहुन्छ?"}
                  </p>

                  <p className="mt-2 text-base leading-7 text-[#4b5f3d]">
                    {language === "en"
                      ? "Reach out for distributor pricing, farm-use guidance, or a direct conversation with the team."
                      : "डिस्ट्रिब्युटर मूल्य, फार्म प्रयोग मार्गदर्शन वा टोलीसँग प्रत्यक्ष छलफलका लागि सम्पर्क गर्नुहोस्।"}
                  </p>
                </div>

                <div className="flex flex-col justify-end gap-3 md:items-end">
                  <Link
                    href="/contact"
                    className="rounded-full bg-[#4a8c28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5a1b]"
                  >
                    {language === "en"
                      ? "Request Sample"
                      : "नमूना अनुरोध गर्नुहोस्"}
                  </Link>

                  <Link
                    href="/contact"
                    className="rounded-full border border-[#7bbf42]/40 px-6 py-3 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
                  >
                    {language === "en"
                      ? "Talk to Sales"
                      : "बिक्री टोलीसँग कुरा गर्नुहोस्"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </SectionWrapper>

      <SectionWrapper className="pb-8 pt-10 md:pt-12">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="soft-panel overflow-hidden p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="section-tag">
                  {language === "en" ? "Description" : "विवरण"}
                </span>
                <h2 className="mt-4 text-3xl text-[#1e3a0f] md:text-4xl">
                  {language === "en"
                    ? "Product description that is easier to read"
                    : "सजिलै पढ्न मिल्ने उत्पादन विवरण"}
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-[#7bbf42]/16 bg-[#fcfdf9] p-5 md:p-6">
              {isLikelyBlockNoteJson(description) ? (
                <EditorViewer
                  content={description}
                  className="-ml-14 md:-ml-12"
                />
              ) : (
                <div className="space-y-5 text-base leading-8 text-[#46583a] md:text-lg md:leading-9">
                  {(descriptionParagraphs.length > 0
                    ? descriptionParagraphs
                    : [description]
                  ).map((paragraph, index) => (
                    <p key={`${paragraph.slice(0, 24)}-${index}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>

          <div className="space-y-6">
            <article className="soft-panel overflow-hidden p-6 md:p-7">
              <span className="section-tag">
                {language === "en" ? "Product Content" : "उत्पादन सार"}
              </span>
              <h2 className="mt-4 text-3xl text-[#1e3a0f]">
                {language === "en" ? "Quick overview" : "छोटो अवलोकन"}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4b5f3d] md:text-lg md:leading-9">
                {content}
              </p>
            </article>

            <article className="soft-panel overflow-hidden p-6 md:p-7">
              <span className="section-tag">
                {language === "en" ? "Features" : "विशेषताहरू"}
              </span>
              <h2 className="mt-4 text-3xl text-[#1e3a0f]">
                {language === "en" ? "What stands out" : "मुख्य विशेषताहरू"}
              </h2>

              <div className="mt-6 grid gap-3">
                {(features.length > 0
                  ? features
                  : [
                      language === "en"
                        ? "Feature details will be added soon."
                        : "विशेषता विवरण चाँडै थपिनेछ।",
                    ]
                ).map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="rounded-3xl border border-[#7bbf42]/16 bg-[#f8fbf2] p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#4a8c28] text-sm font-semibold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="pt-1 text-sm leading-7 text-[#375a26] md:text-base">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
