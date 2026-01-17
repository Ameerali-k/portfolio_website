import { prisma } from "@/lib/prisma";
import { PortfolioItem } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function PortfolioPage() {
    const items = await prisma.portfolioItem.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen">
            <h1 className="text-4xl font-bold mb-12 flex items-center gap-2">
                <span className="w-8 h-1 bg-[var(--primary)] block"></span> All Portfolio
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((work: PortfolioItem) => (
                    <Link key={work.id} href={`/portfolio/${work.id}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 block hover:border-[var(--primary)]/50 transition-colors">
                        <div className="aspect-video bg-black/50 relative overflow-hidden">
                            <img
                                src={work.imageUrl}
                                alt={work.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-bold flex items-center gap-2">View Details <ArrowUpRight /></span>
                            </div>
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-bold text-[var(--primary)] mb-2 block uppercase">{work.category || "Design"}</span>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{work.title}</h3>
                            <p className="text-sm opacity-60 line-clamp-2">{work.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
