import LandingContent from "@/components/LandingContent";
import { prisma } from "@/lib/prisma";

// Revalidate data every hour or on-demand
export const revalidate = 3600;

async function getRecentWorks() {
  try {
    const works = await prisma.portfolioItem.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return works;
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return [];
  }
}

export default async function Home() {
  const recentWorks = await getRecentWorks();

  return (
    <LandingContent recentWorks={recentWorks} />
  );
}
