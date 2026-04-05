import SectionWrapper from "@/src/components/SectionWrapper";
import { Translated } from "@/src/components/TranslationComponents";
import Link from "next/link";

const farmingHighlights = [
  {
    title: {
      en: "Better Digestion Efficiency",
      ne: "सुधारिएको पाचन दक्षता",
    },
    en: "Improves digestive stability and daily feed utilization",
    ne: "पाचन स्थिरता र दैनिक फिड उपयोग सुधार गर्छ",
  },
  {
    title: {
      en: "Stronger Natural Immunity",
      ne: "बलियो प्राकृतिक प्रतिरक्षा",
    },
    en: "Supports immunity under seasonal and environmental stress",
    ne: "मौसमी र वातावरणीय तनावमा प्रतिरक्षा समर्थन गर्छ",
  },
  {
    title: {
      en: "Stable Growth Performance",
      ne: "स्थिर वृद्धि कार्यक्षमता",
    },
    en: "Helps improve consistency of growth and flock performance",
    ne: "वृद्धि र बगाल कार्यक्षमता स्थिर बनाउन सहयोग गर्छ",
  },
  {
    title: {
      en: "Cleaner Sustainable Production",
      ne: "सफा र दिगो उत्पादन",
    },
    en: "Reduces dependency on synthetic growth interventions",
    ne: "कृत्रिम वृद्धि हस्तक्षेपमा निर्भरता घटाउँछ",
  },
];

const fieldChallenges = [
  {
    title: {
      en: "Soil Fatigue Is Increasing",
      ne: "माटो थकान बढ्दो छ",
    },
    en: "Repeated use of only chemical inputs can weaken soil structure and reduce long-term farm efficiency.",
    ne: "केवल रासायनिक इनपुटको दोहोरिएको प्रयोगले माटोको संरचना कमजोर बनाउँछ र दीर्घकालीन फार्म दक्षता घटाउँछ।",
  },
  {
    title: {
      en: "Nutrient Imbalance Affects Flocks",
      ne: "पोषक असन्तुलनले बगाललाई असर गर्छ",
    },
    en: "When crop soils are nutrient-imbalanced, feed quality and the overall poultry production chain become unstable.",
    ne: "बालीको माटोमा पोषक असन्तुलन हुँदा फिड गुणस्तर र समग्र कुखुरा उत्पादन शृङ्खला अस्थिर हुन्छ।",
  },
  {
    title: {
      en: "Biological Activity Drops",
      ne: "जैविक सक्रियता घट्छ",
    },
    en: "Loss of beneficial microbes lowers nutrient availability and makes crops more vulnerable under stress.",
    ne: "लाभदायक सूक्ष्मजीव घट्दा पोषक उपलब्धता कम हुन्छ र बाली तनावमा बढी संवेदनशील हुन्छ।",
  },
];

const practicalActions = [
  {
    en: "Test soil before each major crop cycle and correct deficiencies early.",
    ne: "प्रत्येक प्रमुख बाली चक्रअघि माटो परीक्षण गरी कमीहरू छिट्टै सुधार गर्नुहोस्।",
  },
  {
    en: "Use balanced NPK together with compost or organic manure for stable fertility.",
    ne: "स्थिर उर्वरताका लागि सन्तुलित NPK सँगै कम्पोष्ट वा जैविक मल प्रयोग गर्नुहोस्।",
  },
  {
    en: "Apply nutrients in split doses with moisture management to reduce losses.",
    ne: "नोक्सानी कम गर्न आर्द्रता व्यवस्थापनसँगै पोषक तत्त्व चरणबद्ध रूपमा प्रयोग गर्नुहोस्।",
  },
  {
    en: "Recycle farm residues and strengthen microbial life to rebuild soil naturally.",
    ne: "फार्म अवशेष पुनःप्रयोग गरी सूक्ष्मजीव गतिविधि बढाएर माटोलाई प्राकृतिक रूपमा पुनर्जीवित गर्नुहोस्।",
  },
];

export default function FarmingPage() {
  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="Farming" ne="कृषि" />
          </span>
          <h1 className="section-title mt-4">
            <Translated
              en="Why organic supplements transform poultry farm performance"
              ne="जैविक पूरकले कुखुरा फार्म कार्यक्षमता किन रूपान्तरण गर्छ"
            />
          </h1>
          <p className="section-subtitle mt-4">
            <Translated
              en="Organic supplementation can deliver measurable outcomes across flock health, feed efficiency, and long-term productivity."
              ne="जैविक पूरक प्रयोगले बगाल स्वास्थ्य, फिड दक्षता र दीर्घकालीन उत्पादकत्वमा मापनयोग्य परिणाम दिन सक्छ।"
            />
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-6">
        <div className="grid gap-5 md:grid-cols-3">
          {farmingHighlights.map((item) => (
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

      <SectionWrapper className="pt-10 md:pt-12">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">
            <Translated en="Field Reality" ne="क्षेत्रको वास्तविकता" />
          </span>
          <h2 className="mt-4 text-4xl leading-tight text-[#1e3a0f]">
            <Translated
              en="Farm productivity improves when soil health is protected first"
              ne="पहिले माटो स्वास्थ्य सुरक्षित गर्दा फार्म उत्पादकत्व सुधार हुन्छ"
            />
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#4b5f3d] md:text-base">
            <Translated
              en="The reference guidance highlights a common challenge in Nepal: heavy dependence on chemical-only practices can reduce soil quality over time. For poultry-linked farms, this directly affects feed crop quality, production consistency, and operating cost. A balanced approach that combines scientific nutrients with organic matter gives more stable results season after season."
              ne="सन्दर्भ सामग्रीले नेपालमा देखिने एउटा मुख्य चुनौती देखाउँछ: केवल रासायनिक अभ्यासमा उच्च निर्भरताले समयसँगै माटोको गुणस्तर घटाउन सक्छ। कुखुरा-सम्बद्ध फार्मका लागि यसले फिड बालीको गुणस्तर, उत्पादन स्थिरता र सञ्चालन खर्चमा सीधा असर गर्छ। वैज्ञानिक पोषक तत्त्व र जैविक पदार्थ सन्तुलित रूपमा मिलाएर प्रयोग गर्दा मौसमैपिच्छे परिणाम बढी स्थिर हुन्छ।"
            />
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {fieldChallenges.map((item) => (
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
            <Translated en="Recommended Actions" ne="सिफारिस गरिएका कदमहरू" />
          </span>
          <h2 className="mt-4 text-4xl leading-tight text-[#1e3a0f]">
            <Translated
              en="Practical steps your farm team can apply immediately"
              ne="तपाईंको फार्म टोलीले तुरुन्त लागू गर्न सक्ने व्यावहारिक कदमहरू"
            />
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {practicalActions.map((item, idx) => (
              <article
                key={item.en}
                className="rounded-2xl border border-[#d6e4bf] bg-white p-5"
              >
                <p className="text-xs font-semibold tracking-[0.12em] text-[#4a8c28] uppercase">
                  <Translated en={`Step ${idx + 1}`} ne={`चरण ${idx + 1}`} />
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
              en="Need a farm-specific supplementation plan?"
              ne="के तपाईंलाई फार्म-विशेष पूरक योजना चाहिन्छ?"
            />
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-black/82 md:text-base">
            <Translated
              en="Our team can help tailor dosage and cycle strategy based on bird type, season, and operation scale."
              ne="हाम्रो टोलीले चराको प्रकार, मौसम र सञ्चालनको आकारअनुसार डोज र चक्र रणनीति तयार गर्न सहयोग गर्छ।"
            />
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e3a0f] transition hover:bg-[#f7f2e8]"
          >
            <Translated
              en="Contact Farm Team"
              ne="फार्म टोलीसँग सम्पर्क गर्नुहोस्"
            />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
