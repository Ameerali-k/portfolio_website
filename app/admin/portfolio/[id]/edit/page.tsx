import PortfolioForm from "@/components/PortfolioForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await prisma.portfolioItem.findUnique({
        where: { id },
    });

    if (!item) {
        notFound();
    }

    return <PortfolioForm initialData={item} isEdit />;
}
