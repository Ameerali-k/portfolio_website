import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { PortfolioItem } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";
import DeletePortfolioButton from "@/components/DeletePortfolioButton";

export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default async function AdminDashboard() {
    const items = await prisma.portfolioItem.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-[0.03] blur-[100px] -z-10" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Admin <span className="text-[var(--primary)]">Dashboard</span></h1>
                    <LogoutButton />
                </div>
                <Link href="/admin/portfolio/new" className="w-full sm:w-auto bg-[var(--primary)] text-black px-8 py-3 rounded-xl flex justify-center items-center gap-2 font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all neon-glow active:scale-95">
                    <Plus size={20} /> Add New Project
                </Link>
            </div>

            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {items.length === 0 ? (
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center opacity-50">
                        No projects found.
                    </div>
                ) : (
                    items.map((item: PortfolioItem) => (
                        <div key={item.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <span className="text-[var(--primary)] text-sm font-medium">{item.category}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/portfolio/${item.id}/edit`} className="p-2 hover:text-[var(--primary)] bg-white/5 rounded">
                                        <Edit size={18} />
                                    </Link>
                                    <DeletePortfolioButton id={item.id} />
                                </div>
                            </div>
                            <div className="text-sm opacity-50 pt-2 border-t border-white/5">
                                Added on {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center opacity-50">No projects found.</td>
                            </tr>
                        ) : (
                            items.map((item: PortfolioItem) => (
                                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 font-bold">{item.title}</td>
                                    <td className="p-4 opacity-70">{item.category}</td>
                                    <td className="p-4 opacity-70">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                        <Link href={`/admin/portfolio/${item.id}/edit`} className="p-2 hover:text-[var(--primary)]">
                                            <Edit size={18} />
                                        </Link>
                                        <DeletePortfolioButton id={item.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
