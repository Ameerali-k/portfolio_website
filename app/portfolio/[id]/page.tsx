import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PortfolioDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await prisma.portfolioItem.findUnique({
        where: { id },
    });

    if (!item) {
        notFound();
    }

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 hover:text-[var(--primary)] mb-8 transition-all">
                <ArrowLeft size={16} /> Back to Portfolio
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src={item.imageUrl} alt={item.title} className="w-full object-cover" />
                </div>

                {/* Details */}
                <div>
                    <span className="text-[var(--primary)] font-bold tracking-widest text-sm uppercase mb-4 block">{item.category || "Project"}</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{item.title}</h1>
                    <p className="text-lg opacity-80 leading-relaxed mb-8 whitespace-pre-wrap">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {item.projectUrl && (
                            <a
                                href={item.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-opacity-90 transition-all"
                            >
                                View Live Project <ExternalLink size={18} />
                            </a>
                        )}

                        <Link
                            href="/contact"
                            className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-white/10 transition-all"
                        >
                            Get in Touch <MessageSquare size={18} />
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-sm opacity-60">
                        <div>
                            <span className="block font-bold text-white mb-1">Date</span>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                            <span className="block font-bold text-white mb-1">Category</span>
                            {item.category}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
