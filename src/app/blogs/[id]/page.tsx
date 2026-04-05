import prisma from "@/lib/prisma";
import { getLocalizedText, type LocalizedText } from "@/src/helpers/i18n";
import BlogDetailContent from "./BlogDetailContent";
import { notFound } from "next/navigation";

type BlogDetail = {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  content: LocalizedText;
  imageUrl?: string;
  createdAt: string;
};

const resolveBlog = async (id: number): Promise<BlogDetail | null> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (blog) {
      return {
        id: blog.id,
        title: getLocalizedText(blog.titleI18n, blog.title),
        description: getLocalizedText(blog.descriptionI18n, blog.description),
        content: getLocalizedText(blog.contentI18n, blog.content),
        imageUrl: blog.imageUrl,
        createdAt: blog.createdAt.toISOString(),
      };
    }
  } catch {
    return null;
  }

  return null;
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogId = Number(id);

  if (!Number.isInteger(blogId) || blogId <= 0) {
    notFound();
  }

  const blog = await resolveBlog(blogId);

  if (!blog) {
    notFound();
  }

  return <BlogDetailContent blog={blog} />;
}
