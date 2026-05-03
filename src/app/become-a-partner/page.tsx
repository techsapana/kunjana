import prisma from "@/lib/prisma";
import PartnerContent from "./PartnerContent";


export default async function BecomePartnerPage() {
  const partnersData = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
  });

  const partners = partnersData.map((partner) => ({
    id: partner.id,
    name: partner.name,
    imageUrl: partner.imageUrl,
    description: partner.description,
  }));

  return <PartnerContent initialPartners={partners} />;
}
