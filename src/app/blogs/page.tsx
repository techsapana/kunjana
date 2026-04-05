import prisma from "@/lib/prisma";
import BlogCard from "@/src/components/BlogCard";
import SectionWrapper from "@/src/components/SectionWrapper";
import { Translated } from "@/src/components/TranslationComponents";
import { getLocalizedText, type LocalizedText } from "@/src/helpers/i18n";

const getBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
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

export default async function BlogsPage() {
  const blogs = (await getBlogs()) as {
    id: number;
    title: LocalizedText;
    description: LocalizedText;
    imageUrl?: string;
    createdAt: string;
  }[];

  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 text-center md:p-10">
          <span className="section-tag">
            <Translated en="Blogs" ne="ब्लगहरू" />
          </span>
          <h1 className="section-title mt-4">
            <Translated
              en="Insights from our poultry and nutrition team"
              ne="हाम्रो कुखुरा तथा पोषण टोलीबाट उपयोगी जानकारी"
            />
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            <Translated
              en="Explore practical farm guidance, supplementation approaches, and operational lessons from the NaturePure ecosystem."
              ne="नेचरप्योर इकोसिस्टमबाट व्यावहारिक फार्म मार्गदर्शन, पूरक प्रयोग विधि र सञ्चालन अनुभवहरू पढ्नुहोस्।"
            />
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10 md:py-14">
        {blogs.length === 0 ? (
          <div className="soft-panel p-10 text-center">
            <h2 className="text-2xl text-[#1e3a0f]">
              <Translated
                en="No blogs published yet"
                ne="अहिलेसम्म कुनै ब्लग प्रकाशित छैन"
              />
            </h2>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              <Translated
                en="We are preparing practical guides and stories from our team. Please check back soon for the latest updates."
                ne="हाम्रो टोली व्यावहारिक गाइड र अनुभवहरू तयार गर्दैछ। नयाँ अपडेटका लागि छिट्टै पुनः हेर्नुहोस्।"
              />
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
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
    </>
  );
}
