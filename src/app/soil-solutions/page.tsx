import prisma from "@/lib/prisma";
import ProductCard from "@/src/components/ProductCard";
import SectionWrapper from "@/src/components/SectionWrapper";
import { Translated } from "@/src/components/TranslationComponents";
import {
  getLocalizedStringList,
  getLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";
import Link from "next/link";

const soilSolutionsHighlights = [
  {
    title: {
      en: "Soil Diagnostics",
      ne: "माटो निदान",
    },
    en: "Field-oriented soil diagnostics and fertility review",
    ne: "क्षेत्रमै आधारित माटो जाँच र उर्वरता समीक्षा",
  },
  {
    title: {
      en: "Nutrient Balancing",
      ne: "पोषक सन्तुलन",
    },
    en: "Nutrient balancing programs aligned with crop cycles",
    ne: "बाली चक्रअनुसार पोषक सन्तुलन कार्यक्रम",
  },
  {
    title: {
      en: "Implementation Guidance",
      ne: "कार्यान्वयन मार्गदर्शन",
    },
    en: "Practical implementation guidance for long-term soil health",
    ne: "दीर्घकालीन माटो स्वास्थ्यका लागि व्यावहारिक मार्गदर्शन",
  },
  {
    title: {
      en: "Integrated Advisory",
      ne: "एकीकृत परामर्श",
    },
    en: "Integrated advisory for poultry-crop sustainability systems",
    ne: "कुखुरा-बाली दिगोपन प्रणालीका लागि एकीकृत परामर्श",
  },
];

const soilRealityPoints = [
  {
    title: {
      en: "Excessive Chemical Dependency",
      ne: "रासायनिक निर्भरता अत्यधिक",
    },
    en: "Over-reliance on chemical fertilizers and pesticides can disturb the natural physical, chemical, and biological balance of soil.",
    ne: "रासायनिक मल र विषादीमा अत्यधिक निर्भरताले माटोको प्राकृतिक भौतिक, रासायनिक र जैविक सन्तुलन बिगार्न सक्छ।",
  },
  {
    title: {
      en: "Declining Organic Matter",
      ne: "जैविक पदार्थ घट्दो",
    },
    en: "Low organic matter weakens water-holding capacity and limits nutrient efficiency across crop seasons.",
    ne: "माटोमा जैविक पदार्थ कम हुँदा पानी धारण क्षमता कमजोर हुन्छ र बाली मौसमभर पोषक दक्षता घट्छ।",
  },
  {
    title: {
      en: "Soil Biology Under Pressure",
      ne: "माटोको जैविक जीवनमा दबाब",
    },
    en: "Reduced microbial diversity slows nutrient cycling and increases long-term production risk.",
    ne: "सूक्ष्मजीव विविधता घट्दा पोषक चक्र ढिलो हुन्छ र दीर्घकालीन उत्पादन जोखिम बढ्छ।",
  },
  {
    title: {
      en: "Yield Becomes Costly",
      ne: "उत्पादन महँगो बन्दै जान्छ",
    },
    en: "When soils degrade, farmers often need higher input cost to maintain similar yield levels.",
    ne: "माटो कमजोर हुँदा समान उत्पादन कायम राख्न किसानले धेरै इनपुट खर्च गर्नुपर्ने अवस्था आउँछ।",
  },
];

const rehabilitationFramework = [
  {
    en: "Start with lab and field-level soil tests to identify pH, organic matter, and nutrient gaps.",
    ne: "pH, जैविक पदार्थ र पोषक कमी पहिचान गर्न प्रयोगशाला तथा क्षेत्रस्तरीय माटो परीक्षणबाट सुरु गर्नुहोस्।",
  },
  {
    en: "Apply balanced NPK by crop stage, not one-time blanket application.",
    ne: "एकै पटकको प्रयोग होइन, बाली चरणअनुसार सन्तुलित NPK प्रयोग गर्नुहोस्।",
  },
  {
    en: "Integrate compost, farmyard manure, and residue recycling to rebuild carbon and structure.",
    ne: "कार्बन र संरचना पुनर्निर्माणका लागि कम्पोष्ट, गोठेमाल र अवशेष पुनःप्रयोगलाई एकीकृत गर्नुहोस्।",
  },
  {
    en: "Protect biological activity through moisture control, mulching, and reduced unnecessary chemical load.",
    ne: "आर्द्रता व्यवस्थापन, मल्चिङ र अनावश्यक रासायनिक भार घटाएर माटोको जैविक सक्रियता सुरक्षित गर्नुहोस्।",
  },
];

type SoilProduct = {
  id: number;
  name: LocalizedText;
  content: LocalizedText;
  features: LocalizedStringList;
  price: number;
  imageUrl?: string;
};

const getSoilProducts = async (): Promise<SoilProduct[]> => {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    return products.map((product) => ({
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
    }));
  } catch {
    return [];
  }
};

export default async function SoilSolutionsPage() {
  const products = await getSoilProducts();

  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="Soil Solutions" ne="माटो समाधान" />
          </span>
          <h1 className="section-title mt-4">
            <Translated
              en="The foundation of better farming starts from better soil"
              ne="उत्तम खेतीको आधार उत्तम माटोबाट सुरु हुन्छ"
            />
          </h1>
          <p className="section-subtitle mt-4">
            <Translated
              en="Soil Solutions extends our sustainability focus by helping farms improve crop health, fertility management, and long-term yield quality through practical soil programs."
              ne="Soil Solutions ले व्यावहारिक माटो कार्यक्रममार्फत फार्मलाई बाली स्वास्थ्य, उर्वरता व्यवस्थापन र दीर्घकालीन उत्पादन गुणस्तर सुधार्न सहयोग गरी हाम्रो दिगोपन लक्ष्यलाई विस्तार गर्छ।"
            />
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="products-preview" className="py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-tag">
              <Translated en="Product Range" ne="उत्पादन श्रृंखला" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Featured products from our supplement line"
                ne="हाम्रो पूरक श्रृंखलाका विशेष उत्पादनहरू"
              />
            </h2>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2 text-sm font-semibold text-[#2d5a1b] hover:bg-[#eaf4d8]"
          >
            <Translated en="View All Products" ne="सबै उत्पादन हेर्नुहोस्" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="soft-panel mt-8 p-8 text-center">
            <h3 className="text-2xl text-[#1e3a0f]">
              <Translated
                en="No products available yet"
                ne="अहिलेसम्म कुनै उत्पादन उपलब्ध छैन"
              />
            </h3>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              <Translated
                en="Our product lineup will appear here after publication."
                ne="प्रकाशनपछि हाम्रो उत्पादन सूची यहाँ देखिनेछ।"
              />
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                content={product.content}
                features={product.features}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-6">
        <div className="grid gap-5 md:grid-cols-3">
          {soilSolutionsHighlights.map((item) => (
            <article key={item.en} className="soft-panel p-6">
              <h2 className=" text-2xl text-[#1e3a0f]">
                <Translated en={item.title.en} ne={item.title.ne} />
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                <Translated en={item.en} ne={item.ne} />
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="products-preview" className="py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-tag">
              <Translated en="Product Range" ne="उत्पादन श्रृंखला" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Featured products from our supplement line"
                ne="हाम्रो पूरक श्रृंखलाका विशेष उत्पादनहरू"
              />
            </h2>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2 text-sm font-semibold text-[#2d5a1b] hover:bg-[#eaf4d8]"
          >
            <Translated en="View All Products" ne="सबै उत्पादन हेर्नुहोस्" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="soft-panel mt-8 p-8 text-center">
            <h3 className="text-2xl text-[#1e3a0f]">
              <Translated
                en="No products available yet"
                ne="अहिलेसम्म कुनै उत्पादन उपलब्ध छैन"
              />
            </h3>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              <Translated
                en="Our product lineup will appear here after publication."
                ne="प्रकाशनपछि हाम्रो उत्पादन सूची यहाँ देखिनेछ।"
              />
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                content={product.content}
                features={product.features}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper className="pt-10 md:pt-12">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="Reference Insight" ne="सन्दर्भबाट मुख्य कुरा" />
          </span>
          <h2 className="mt-4 text-4xl leading-tight text-[#1e3a0f]">
            <Translated
              en="Healthy soil is not optional, it is the engine of national farm productivity"
              ne="स्वस्थ माटो विकल्प होइन, राष्ट्रिय कृषि उत्पादकत्वको मूल इन्जिन हो"
            />
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#4b5f3d] md:text-base">
            <Translated
              en="The reference material clearly emphasizes that Nepal's farming strength depends on living soil. When soil structure, nutrients, and microbial life are ignored, productivity drops and environmental pressure rises. Soil Solutions focuses on restoring this foundation through practical, field-ready programs rather than theory-only recommendations."
              ne="सन्दर्भ सामग्रीले स्पष्ट रूपमा देखाउँछ कि नेपालको कृषि शक्ति जीवित माटोमा निर्भर छ। माटोको संरचना, पोषक तत्त्व र सूक्ष्मजीव जीवनलाई बेवास्ता गर्दा उत्पादन घट्छ र वातावरणीय दबाब बढ्छ। Soil Solutions ले केवल सैद्धान्तिक सुझावभन्दा व्यावहारिक, क्षेत्रमै लागू गर्न मिल्ने कार्यक्रममार्फत यही आधार पुनर्स्थापना गर्ने लक्ष्य राख्छ।"
            />
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {soilRealityPoints.map((item) => (
              <article
                key={item.en}
                className="rounded-2xl border border-[#dfe8cf] bg-white/70 p-5"
              >
                <h3 className="text-xl text-[#1e3a0f]">
                  <Translated en={item.title.en} ne={item.title.ne} />
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                  <Translated en={item.en} ne={item.ne} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-10 md:pt-12">
        <div className="soft-panel bg-[#f3f8ea] p-8 md:p-10">
          <span className="section-tag bg-white">
            <Translated
              en="Rehabilitation Framework"
              ne="पुनर्स्थापना कार्यढाँचा"
            />
          </span>
          <h2 className="mt-4 text-4xl leading-tight text-[#1e3a0f]">
            <Translated
              en="How we convert soil diagnosis into measurable recovery"
              ne="कसरी माटोको निदानलाई मापनयोग्य सुधारमा रूपान्तरण गर्छौं"
            />
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {rehabilitationFramework.map((item, idx) => (
              <article
                key={item.en}
                className="rounded-2xl border border-[#d6e4bf] bg-white p-5"
              >
                <p className="text-xs font-semibold tracking-[0.12em] text-[#4a8c28] uppercase">
                  <Translated en={`Phase ${idx + 1}`} ne={`चरण ${idx + 1}`} />
                </p>
                <p className="mt-2 text-sm leading-7 text-[#375024] md:text-base">
                  <Translated en={item.en} ne={item.ne} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-10 md:pt-14">
        <div className="soft-panel bg-linear-to-r from-[#1e3a0f] via-[#2d5a1b] to-[#4a8c28] p-8 text-black md:p-10">
          <h2 className=" text-4xl leading-tight">
            <Translated
              en="Explore integrated poultry + crop sustainability planning"
              ne="एकीकृत कुखुरा + बाली दिगोपन योजना अन्वेषण गर्नुहोस्"
            />
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-black/82 md:text-base">
            <Translated
              en="Reach out for soil diagnostics, nutrient programs, and farm advisory built around practical implementation."
              ne="व्यावहारिक कार्यान्वयनमा आधारित माटो जाँच, पोषक कार्यक्रम र फार्म परामर्शका लागि सम्पर्क गर्नुहोस्।"
            />
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e3a0f] transition hover:bg-[#f7f2e8]"
          >
            <Translated
              en="Connect With Soil Team"
              ne="माटो टोलीसँग सम्पर्क गर्नुहोस्"
            />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
