import SectionWrapper from "@/src/components/SectionWrapper";
import { Translated } from "@/src/components/TranslationComponents";
import Link from "next/link";

const pillars = [
  {
    title: {
      en: "Disease Treatment & Viral Control",
      ne: "रोग उपचार र भाइरल नियन्त्रण",
    },
    description: {
      en: "Practical treatment protocols designed to reduce health risks and improve flock resilience.",
      ne: "स्वास्थ्य जोखिम घटाउन र बगालको सहनशीलता बढाउन डिजाइन गरिएका व्यावहारिक उपचार पद्धतिहरू।",
    },
  },
  {
    title: { en: "Water Purification Systems", ne: "पानी शुद्धीकरण प्रणाली" },
    description: {
      en: "Clean water support solutions tailored for modern poultry operations.",
      ne: "आधुनिक कुखुरा सञ्चालनका लागि अनुकूलित स्वच्छ पानी सहयोग समाधानहरू।",
    },
  },
  {
    title: { en: "Nutritional Supplements", ne: "पोषण पूरकहरू" },
    description: {
      en: "Effective supplements such as lactose and D-Lac to support poultry strength and productivity.",
      ne: "कुखुराको शक्ति र उत्पादकता बढाउन ल्याक्टोज र डी-ल्याक जस्ता प्रभावकारी पूरकहरू।",
    },
  },
  {
    title: { en: "Farm Hygiene Solutions", ne: "फार्म स्वच्छता समाधान" },
    description: {
      en: "Reliable cleaning and hygiene support to keep farm operations smooth and safe.",
      ne: "फार्म सञ्चालनलाई सहज र सुरक्षित राख्न भरपर्दो सफाइ र स्वच्छता सहयोग।",
    },
  },
];

const milestones = [
  {
    label: { en: "Years of field learning", ne: "फिल्ड अनुभवका वर्ष" },
    value: "15+",
  },
  { label: { en: "Partner farms", ne: "साझेदार फार्म" }, value: "500+" },
  { label: { en: "Supplement solutions", ne: "पूरक समाधान" }, value: "12+" },
  {
    label: { en: "Regional distributors", ne: "क्षेत्रीय वितरक" },
    value: "30+",
  },
];

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="About Kunjana Agro" ne="कुञ्जना एग्रोबारे" />
          </span>
          <h1 className="section-title mt-4 max-w-4xl">
            <Translated
              en="Pioneering organic poultry health and farm protection solutions for modern farming."
              ne="आधुनिक खेतीका लागि अग्रणी जैविक कुखुरा स्वास्थ्य तथा फार्म संरक्षण समाधानहरू।"
            />
          </h1>
          <p className="section-subtitle mt-5 max-w-3xl">
            <Translated
              en="Kunjana Agro works closely with poultry farms to deliver effective disease control, clean water systems, nutritional supplementation, and hygiene solutions supported by practical usage guidance and reliable field-level support for better farm performance."
              ne="कुञ्जना एग्रोले प्रभावकारी रोग नियन्त्रण, स्वच्छ पानी प्रणाली, पोषण पूरक तथा स्वच्छता समाधान उपलब्ध गराउन कुखुरा फार्महरूसँग नजिकबाट काम गर्छ, जसलाई व्यावहारिक प्रयोग मार्गदर्शन र भरोसायोग्य फिल्ड-स्तर सहयोगले थप मजबुत बनाउँछ।"
            />
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item) => (
            <article
              key={item.label.en}
              className="soft-panel p-6 text-center transition hover:-translate-y-0.5"
            >
              <p className=" text-4xl text-[#2d5a1b]">{item.value}</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-[#5b6f49] uppercase">
                <Translated en={item.label.en} ne={item.label.ne} />
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="soft-panel p-8 md:p-10">
            <span className="section-tag">
              <Translated en="Our Mission" ne="हाम्रो उद्देश्य" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Healthier Poultry, Smoother Farming, Sustainable Growth."
                ne="स्वस्थ कुखुरा, सहज खेती, दिगो वृद्धि।"
              />
            </h2>
            <p className="section-subtitle mt-4">
              <Translated
                en="We aim to promote organic poultry farming by improving broiler health, extending flock life, and ensuring smooth farm operations through safe, effective, and practical solutions."
                ne="हामी ब्रायलर स्वास्थ्य सुधार, बगालको आयु वृद्धि तथा सुरक्षित, प्रभावकारी र व्यावहारिक समाधानमार्फत फार्म सञ्चालनलाई सहज बनाउँदै जैविक कुखुरा पालन प्रवर्द्धन गर्ने लक्ष्य राख्छौं।"
              />
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-[#4a8c28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d5a1b]"
              >
                <Translated en="Explore Products" ne="उत्पादनहरू हेर्नुहोस्" />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#7bbf42]/35 px-5 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
              >
                <Translated
                  en="Talk to Our Team"
                  ne="हाम्रो टोलीसँग कुरा गर्नुहोस्"
                />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.title.en} className="soft-panel p-5">
                <h3 className=" text-2xl text-[#1e3a0f]">
                  <Translated en={pillar.title.en} ne={pillar.title.ne} />
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                  <Translated
                    en={pillar.description.en}
                    ne={pillar.description.ne}
                  />
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-10 md:pt-14">
        <div className="soft-panel bg-linear-to-r from-[#1e3a0f] via-[#2d5a1b] to-[#4a8c28] p-8 text-black md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/30 px-4 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                <Translated en="Partnership" ne="साझेदारी" />
              </span>
              <h2 className="mt-4  text-4xl leading-tight">
                <Translated
                  en="Looking to distribute Kunjana Agro products in your region?"
                  ne="के तपाईं आफ्नो क्षेत्रमा कुञ्जना एग्रोका उत्पादन वितरण गर्न चाहनुहुन्छ?"
                />
              </h2>
            </div>
            <Link
              href="/become-a-partner"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e3a0f] transition hover:bg-[#f7f2e8]"
            >
              <Translated en="Become a Partner" ne="साझेदार बन्नुहोस्" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
