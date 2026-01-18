"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PortfolioFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function PortfolioForm({ initialData, isEdit }: PortfolioFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        category: initialData?.category || "",
        imageUrl: initialData?.imageUrl || "",
        projectUrl: initialData?.projectUrl || "",
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("Upload failed");

            const result = await res.json();
            setFormData({ ...formData, imageUrl: result.url });
        } catch (error) {
            console.error(error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isEdit ? `/api/portfolio/${initialData.id}` : "/api/portfolio";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl relative">
            <div className="absolute top-1/4 -right-20 w-64 h-64 bg-[var(--primary)] opacity-[0.03] blur-[120px] -z-10" />

            <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <h1 className="text-4xl font-black mb-10 tracking-tight">{isEdit ? "Edit" : "Add New"} <span className="text-[var(--primary)]">Project</span></h1>

            <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl space-y-8 relative overflow-hidden">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Project Title</label>
                        <input
                            type="text"
                            placeholder="Enter project name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08]"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Category</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08]"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g. Graphic Design, Web Development"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Description</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 h-40 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08] resize-none"
                            placeholder="Describe the project..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Project Visual</label>

                        {formData.imageUrl ? (
                            <div className="relative w-full aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 neon-glow">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                    className="absolute top-4 right-4 bg-red-500/80 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/[0.08] hover:border-[var(--primary)]/30 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className={`mb-3 ${uploading ? 'animate-bounce text-[var(--primary)]' : 'opacity-40'}`} size={32} />
                                        <p className="text-sm font-bold tracking-widest uppercase opacity-40">{uploading ? "Uploading..." : "Drop file or Click"}</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Live Link (Optional)</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08]"
                            value={formData.projectUrl}
                            onChange={e => setFormData({ ...formData, projectUrl: e.target.value })}
                            placeholder="https://yourproject.com"
                        />
                    </div>
                </div>

                <button
                    disabled={loading || uploading || !formData.imageUrl}
                    className="w-full bg-[var(--primary)] text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 neon-glow mt-4"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving Project...
                        </>
                    ) : (
                        isEdit ? "Update Portfolio Item" : "Save Portfolio Item"
                    )}
                </button>

                <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--primary)] opacity-[0.02] blur-3xl -z-10" />
            </form>
        </div>
    );
}
