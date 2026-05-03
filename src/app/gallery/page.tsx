import prisma from "@/lib/prisma";
import GalleryContent from "./GalleryContent";

export default async function GalleryPage() {
  const galleriesData = await prisma.gallery.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const galleries = galleriesData.map((gallery) => ({
    id: gallery.id,
    title: gallery.title,
    titleI18n: gallery.titleI18n as { en: string; ne: string },
    images: gallery.images.map((img) => ({
      id: img.id,
      url: img.url,
      galleryId: img.galleryId,
    })),
  }));

  return <GalleryContent initialGalleries={galleries} />;
}
