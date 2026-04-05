"use client";

import EditorViewer from "@/src/components/EditorViewer";
import SectionWrapper from "@/src/components/SectionWrapper";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";
import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";

type BlogDetailContentProps = {
  blog: {
    id: number;
    title: LocalizedText;
    description: LocalizedText;
    content: LocalizedText;
    imageUrl?: string;
    createdAt: string;
  };
};

const isLikelyBlockNoteJson = (value: string) => {
  const trimmed = value.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
};

export default function BlogDetailContent({ blog }: BlogDetailContentProps) {
  const { language } = useTranslation();
  const title = pickLocalizedText(blog.title, language);
  const description = pickLocalizedText(blog.description, language);
  const content = pickLocalizedText(blog.content, language);

  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <Link
          href="/blogs"
          className="rounded-full border border-[#7bbf42]/35 px-5 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
        >
          {language === "en" ? "Back to Blogs" : "ब्लगहरूमा फर्कनुहोस्"}
        </Link>
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-6">
        <article className="soft-panel overflow-hidden p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#4a8c28] uppercase">
            {new Date(blog.createdAt).toLocaleDateString(
              language === "ne" ? "ne-NP" : "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>

          <h1 className="mt-3 max-w-4xl  text-4xl leading-tight text-[#1e3a0f] md:text-5xl">
            {title}
          </h1>

          {blog.imageUrl && (
            <div className="relative mt-6 h-72 overflow-hidden rounded-2xl border border-[#7bbf42]/20 md:h-115">
              <Image
                src={blog.imageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#4b5f3d]">
            {description}
          </p>

          <div className="mt-8 rounded-2xl border border-[#7bbf42]/20 bg-[#fbfdf7] p-4 md:p-5">
            {isLikelyBlockNoteJson(content) ? (
              <EditorViewer content={content} className="-ml-14" />
            ) : (
              <div className="space-y-4 text-sm leading-7 text-[#4b5f3d] md:text-base">
                {content.split("\n").map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) {
                    return null;
                  }

                  return <p key={`${trimmed}-${index}`}>{trimmed}</p>;
                })}
              </div>
            )}
          </div>
        </article>
      </SectionWrapper>
    </>
  );
}
