"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
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
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <Link href="/admin/dashboard" className="flex items-center gap-2 mb-6 text-sm opacity-60 hover:opacity-100">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-8">{isEdit ? "Edit Portfolio" : "Add New Portfolio"}</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
                <div>
                    <label className="block text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/10 rounded p-3 text-white placeholder-white/30 focus:border-[var(--primary)] outline-none transition-colors"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/10 rounded p-3 text-white placeholder-white/30 focus:border-[var(--primary)] outline-none transition-colors"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Branding, Web Design"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="w-full bg-white/10 border border-white/10 rounded p-3 text-white placeholder-white/30 h-32 focus:border-[var(--primary)] outline-none transition-colors"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Image</label>

                    {formData.imageUrl ? (
                        <div className="relative w-full h-64 bg-black/50 rounded overflow-hidden border border-white/10">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="mb-2 opacity-50" />
                                    <p className="text-sm text-gray-400">{uploading ? "Uploading..." : "Click to upload image"}</p>
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

                <div>
                    <label className="block text-sm font-bold mb-2">Project URL</label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/10 rounded p-3 text-white placeholder-white/30 focus:border-[var(--primary)] outline-none transition-colors"
                        value={formData.projectUrl}
                        onChange={e => setFormData({ ...formData, projectUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <button
                    disabled={loading || uploading || !formData.imageUrl}
                    className="w-full bg-[var(--primary)] text-white py-3 rounded font-bold hover:bg-opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                >
                    {loading ? "Saving..." : "Save Portfolio Item"}
                </button>
            </form>
        </div>
    );
}
