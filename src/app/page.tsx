import prisma from "@/lib/prisma";
import { Translated } from "@/src/components/TranslationComponents";
import BlogCard from "@/src/components/BlogCard";
import Hero from "@/src/components/Hero";
import PartnerCarousel from "@/src/components/PartnerCarousel";
import ProductCard from "@/src/components/ProductCard";
import SectionWrapper from "@/src/components/SectionWrapper";
import TeamMembersCarousel from "@/src/components/TeamMembersCarousel";
import {
  getLocalizedStringList,
  getLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";
import Link from "next/link";

const partnerBenefits = [
  {
    en: "Disease treatment and viral control solutions",
    ne: "रोग उपचार र भाइरल नियन्त्रण समाधानहरू",
  },
  {
    en: "Water purification systems for safer poultry operations",
    ne: "सुरक्षित कुखुरा सञ्चालनका लागि पानी शुद्धीकरण प्रणाली",
  },
  {
    en: "Nutritional supplements including lactose and D-Lac",
    ne: "ल्याक्टोज र डी-ल्याक सहित पोषण पूरकहरू",
  },
  {
    en: "Farm hygiene and cleaning support systems",
    ne: "फार्म स्वच्छता र सफाइ सहयोग प्रणाली",
  },
];

const farmingHighlights = [
  {
    en: "Organic and safe formulations for regular farm use",
    ne: "नियमित फार्म प्रयोगका लागि जैविक र सुरक्षित फर्मुलेसनहरू",
  },
  {
    en: "Improved poultry health and immunity support",
    ne: "कुखुराको स्वास्थ्य र प्रतिरक्षा सुधार सहयोग",
  },
  {
    en: "Consistent growth and better productivity outcomes",
    ne: "स्थिर वृद्धि र राम्रो उत्पादकता परिणाम",
  },
];

const soilSolutionsHighlights = [
  {
    en: "Scientifically developed poultry treatment programs",
    ne: "वैज्ञानिक रूपमा विकसित कुखुरा उपचार कार्यक्रम",
  },
  {
    en: "Clean water systems designed for modern farms",
    ne: "आधुनिक फार्मका लागि डिजाइन गरिएका स्वच्छ पानी प्रणाली",
  },
  {
    en: "Risk reduction with practical disease control",
    ne: "व्यावहारिक रोग नियन्त्रणद्वारा जोखिम न्यूनीकरण",
  },
  {
    en: "Safe farming without harmful side effects",
    ne: "हानिकारक साइड इफेक्ट बिना सुरक्षित खेती",
  },
];

type HomeProduct = {
  id: number;
  name: LocalizedText;
  content: LocalizedText;
  features: LocalizedStringList;
  price: number;
  imageUrl?: string;
};

type HomeBlog = {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl?: string;
  createdAt: string;
};

type HomePartner = {
  id: number;
  name: LocalizedText;
  imageUrl: string;
  description: LocalizedText;
};

type HomeTeamMember = {
  id: number;
  name: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
};

const getHomeProducts = async (): Promise<HomeProduct[]> => {
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

const getHomeBlogs = async (): Promise<HomeBlog[]> => {
  try {
    const blogs = await prisma.blog.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    return blogs.map((blog) => ({
      id: blog.id,
      title: getLocalizedText(blog.titleI18n, blog.title),
      description: getLocalizedText(blog.descriptionI18n, blog.description),
      imageUrl: blog.imageUrl,
      createdAt: blog.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
};

const getHomePartners = async (): Promise<HomePartner[]> => {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return partners
      .filter((partner) => partner.imageUrl)
      .map((partner) => ({
        id: partner.id,
        name: getLocalizedText(partner.nameI18n, partner.name),
        imageUrl: partner.imageUrl,
        description: getLocalizedText(
          partner.descriptionI18n,
          partner.description,
        ),
      }));
  } catch {
    return [];
  }
};

const getHomeTeamMembers = async (): Promise<HomeTeamMember[]> => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    return teamMembers.map((member) => ({
      id: member.id,
      name: getLocalizedText(member.nameI18n, member.name),
      role: getLocalizedText(member.roleI18n, member.role),
      description: getLocalizedText(member.descriptionI18n, member.description),
      imageUrl: member.imageUrl,
    }));
  } catch {
    return [];
  }
};

export default async function Home() {
  const [products, blogs, partners, teamMembers] = await Promise.all([
    getHomeProducts(),
    getHomeBlogs(),
    getHomePartners(),
    getHomeTeamMembers(),
  ]);

  return (
    <>
      <Hero />

      <SectionWrapper id="about-preview" className="pb-8">
        <div className="soft-panel grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <span className="section-tag">
              <Translated en="Who We Are" ne="हामी को हौं" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Pioneering organic poultry health and farm protection solutions for modern farming."
                ne="आधुनिक खेतीका लागि अग्रणी जैविक कुखुरा स्वास्थ्य तथा फार्म संरक्षण समाधानहरू।"
              />
            </h2>
            <p className="section-subtitle mt-4">
              <Translated
                en="Kunjana Agro develops practical and effective poultry solutions including disease treatment, water purification, nutritional supplements, and farm hygiene systems designed to improve flock health, reduce risks, and support safe, sustainable farming without harmful side effects."
                ne="कुञ्जना एग्रोले रोग उपचार, पानी शुद्धीकरण, पोषण पूरक तथा फार्म स्वच्छता प्रणाली सहित व्यावहारिक र प्रभावकारी कुखुरा समाधान विकास गर्छ, जसले बगालको स्वास्थ्य सुधार, जोखिम न्यूनीकरण तथा हानिकारक असर बिना सुरक्षित र दिगो खेतीलाई समर्थन गर्छ।"
              />
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex rounded-full bg-[#4a8c28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5a1b]"
            >
              <Translated en="Learn More" ne="थप जान्नुहोस्" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: {
                  en: "Organic & Safe Formulations",
                  ne: "जैविक र सुरक्षित फर्मुलेसन",
                },
                description: {
                  en: "Designed for practical daily use in modern poultry farms.",
                  ne: "आधुनिक कुखुरा फार्ममा दैनिक व्यावहारिक प्रयोगका लागि डिजाइन गरिएको।",
                },
              },
              {
                title: {
                  en: "Improved Health & Immunity",
                  ne: "स्वास्थ्य र प्रतिरक्षा सुधार",
                },
                description: {
                  en: "Supports stronger disease resistance and flock stability.",
                  ne: "रोग प्रतिरोध क्षमता र बगाल स्थिरता मजबुत बनाउँछ।",
                },
              },
              {
                title: {
                  en: "Consistent Growth",
                  ne: "स्थिर वृद्धि",
                },
                description: {
                  en: "Helps deliver better productivity and smoother operations.",
                  ne: "राम्रो उत्पादकता र सहज सञ्चालनमा सहयोग गर्छ।",
                },
              },
            ].map((item) => (
              <article
                key={item.title.en}
                className="rounded-2xl border border-[#7bbf42]/20 bg-white/80 p-4"
              >
                <h3 className=" text-xl text-[#1e3a0f]">
                  <Translated en={item.title.en} ne={item.title.ne} />
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#4b5f3d]">
                  <Translated
                    en={item.description.en}
                    ne={item.description.ne}
                  />
                </p>
              </article>
            ))}
          </div>
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
            {products.slice(0, 4).map((product) => (
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

      <SectionWrapper className="py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="soft-panel p-6">
            <span className="section-tag">
              <Translated en="Become a Partner" ne="साझेदार बन्नुहोस्" />
            </span>
            <h3 className="mt-4  text-3xl text-[#1e3a0f]">
              <Translated
                en="Complete poultry solution range from Kunjana Agro"
                ne="कुञ्जना एग्रोबाट पूर्ण कुखुरा समाधान श्रृंखला"
              />
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5f3d]">
              {partnerBenefits.map((item) => (
                <li key={item.en}>
                  • <Translated en={item.en} ne={item.ne} />
                </li>
              ))}
            </ul>
            <Link
              href="/become-a-partner"
              className="mt-6 inline-flex rounded-full bg-[#4a8c28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d5a1b]"
            >
              <Translated en="Become a Partner" ne="साझेदार बन्नुहोस्" />
            </Link>
          </article>

          <article className="soft-panel p-6">
            <span className="section-tag">
              <Translated en="Farming" ne="कृषि" />
            </span>
            <h3 className="mt-4  text-3xl text-[#1e3a0f]">
              <Translated
                en="Healthier poultry, stronger growth, better results"
                ne="स्वस्थ कुखुरा, बलियो वृद्धि, राम्रो परिणाम"
              />
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5f3d]">
              {farmingHighlights.map((item) => (
                <li key={item.en}>
                  • <Translated en={item.en} ne={item.ne} />
                </li>
              ))}
            </ul>
            <Link
              href="/farming"
              className="mt-6 inline-flex rounded-full border border-[#7bbf42]/35 px-5 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
            >
              <Translated en="Explore Farming" ne="कृषि हेर्नुहोस्" />
            </Link>
          </article>

          <article className="soft-panel p-6">
            <span className="section-tag">
              <Translated en="Soil Solutions" ne="माटो समाधान" />
            </span>
            <h3 className="mt-4  text-3xl text-[#1e3a0f]">
              <Translated
                en="Advanced treatment and protection systems"
                ne="उन्नत उपचार तथा संरक्षण प्रणालीहरू"
              />
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5f3d]">
              {soilSolutionsHighlights.map((item) => (
                <li key={item.en}>
                  • <Translated en={item.en} ne={item.ne} />
                </li>
              ))}
            </ul>
            <Link
              href="/soil-solutions"
              className="mt-6 inline-flex rounded-full border border-[#7bbf42]/35 px-5 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
            >
              <Translated en="Visit Solutions" ne="समाधान हेर्नुहोस्" />
            </Link>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper id="partners-preview" className="py-2 md:py-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-tag">
              <Translated en="Trusted Network" ne="विश्वसनीय नेटवर्क" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Partner network across poultry farming regions"
                ne="कुखुरा खेती क्षेत्रभर साझेदार नेटवर्क"
              />
            </h2>
            <p className="section-subtitle mt-3">
              <Translated
                en="We work with local distributors and agro professionals to make Kunjana Agro solutions consistently available."
                ne="हामी स्थानीय वितरक र एग्रो विशेषज्ञसँग मिलेर कुञ्जना एग्रोका समाधानहरू निरन्तर उपलब्ध गराउँछौं।"
              />
            </p>
          </div>
          <Link
            href="/become-a-partner"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2 text-sm font-semibold text-[#2d5a1b] hover:bg-[#eaf4d8]"
          >
            <Translated en="Become a Partner" ne="साझेदार बन्नुहोस्" />
          </Link>
        </div>

        <div className="mt-8">
          <PartnerCarousel partners={partners} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="team-preview" className="py-2 md:py-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-tag">
              <Translated en="Team Members" ne="टोली सदस्यहरू" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="People guiding product and field success"
                ne="उत्पादन र फिल्ड सफलतामा मार्गदर्शन गर्ने व्यक्तिहरू"
              />
            </h2>
            <p className="section-subtitle mt-3">
              <Translated
                en="Meet the core team working on poultry nutrition, partner support, and implementation guidance."
                ne="कुखुरा पोषण, साझेदार सहयोग र कार्यान्वयन मार्गदर्शनमा काम गर्ने मुख्य टोलीसँग भेट्नुहोस्।"
              />
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2 text-sm font-semibold text-[#2d5a1b] hover:bg-[#eaf4d8]"
          >
            <Translated en="Connect with Team" ne="टोलीसँग सम्पर्क गर्नुहोस्" />
          </Link>
        </div>

        <div className="mt-8">
          <TeamMembersCarousel members={teamMembers} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="blogs-preview" className="py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-tag">
              <Translated en="Insights" ne="अन्तर्दृष्टि" />
            </span>
            <h2 className="section-title mt-4">
              <Translated
                en="Latest blogs from our field and farm team"
                ne="हाम्रो फिल्ड र फार्म टोलीका नयाँ ब्लगहरू"
              />
            </h2>
          </div>
          <Link
            href="/blogs"
            className="rounded-full border border-[#7bbf42]/35 px-5 py-2 text-sm font-semibold text-[#2d5a1b] hover:bg-[#eaf4d8]"
          >
            <Translated en="View All Blogs" ne="सबै ब्लग हेर्नुहोस्" />
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="soft-panel mt-8 p-8 text-center">
            <h3 className="text-2xl text-[#1e3a0f]">
              <Translated
                en="No blogs published yet"
                ne="अहिलेसम्म कुनै ब्लग प्रकाशित छैन"
              />
            </h3>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              <Translated
                en="Field updates and guidance articles will appear here once posted."
                ne="फिल्ड अपडेट र मार्गदर्शन लेखहरू पोस्ट भएपछि यहाँ देखिनेछन्।"
              />
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {blogs.slice(0, 4).map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imageUrl}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper id="contact-preview" className="pt-10 md:pt-14">
        <div className="soft-panel overflow-hidden bg-[#f7f2e8] p-8 text-black md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="inline-flex rounded-full border border-black/20 px-4 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                <Translated en="Contact Us" ne="सम्पर्क" />
              </span>
              <h2 className="mt-4 text-4xl leading-tight">
                <Translated
                  en="Let's grow something amazing together"
                  ne="आउनुहोस्, सँगै केही उत्कृष्ट बनाऔं"
                />
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/80 md:text-base">
                <Translated
                  en="Whether you are planting your first seed or scaling your harvest, we are just a message away. Our team is always ready to help you grow smarter, faster, and greener."
                  ne="तपाईं पहिलो बीउ रोप्दै हुनुहोस् वा उत्पादन विस्तार गर्दै हुनुहोस्, हामी एक सन्देश टाढा छौं। हाम्रो टोली तपाईंलाई अझ स्मार्ट, छिटो र हरित वृद्धि गर्न सधैं तयार छ।"
                />
              </p>
              <p className="mt-3 text-sm text-black/60">
                <Translated
                  en="Banasthali Chwok, Kathmandu · 9746305967 / 9824159746"
                  ne="बनस्थली चोक, काठमाडौं · ९७४६३०५९६७ / ९८२४१५९७४६"
                />
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-[#1e3a0f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5a1b]"
            >
              <Translated en="Get in Touch" ne="सम्पर्कमा रहनुहोस्" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
