"use client";

import { useState } from "react";
import { Mail, User, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 min-h-[80vh] flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <h1 className="text-5xl font-bold mb-6">Let's Work <br /><span className="text-[var(--primary)]">Together</span></h1>
                <p className="text-lg opacity-70 mb-8 max-w-md">
                    Have a project in mind? Looking for a partner to bring your vision to life? Fill out the form and I'll get back to you as soon as possible.
                </p>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[var(--primary)]">
                            <Mail />
                        </div>
                        <div>
                            <span className="block text-xs uppercase opacity-50 font-bold">Email Me</span>
                            <a href="mailto:contact@ameerali.com" className="hover:text-[var(--primary)] transition-colors">contact@ameerali.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 w-full bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                {status === "success" ? (
                    <div className="absolute inset-0 z-10 bg-[var(--background)] flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                            <Send size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="opacity-70">Thank you for reaching out. I'll get back to you shortly.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-8 text-[var(--primary)] hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : null}

                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="relative">
                            <User className="absolute top-1/2 -translate-y-1/2 left-4 opacity-50" size={18} />
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 focus:border-[var(--primary)] outline-none transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <Mail className="absolute top-1/2 -translate-y-1/2 left-4 opacity-50" size={18} />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 focus:border-[var(--primary)] outline-none transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <MessageSquare className="absolute top-6 left-4 opacity-50" size={18} />
                            <textarea
                                placeholder="Tell me about your project..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 h-40 focus:border-[var(--primary)] outline-none transition-colors resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        disabled={status === "loading"}
                        className="w-full bg-[var(--primary)] text-white py-4 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {status === "loading" ? "Sending..." : <>Send Message <Send size={18} /></>}
                    </button>

                    {status === "error" && (
                        <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    );
}
