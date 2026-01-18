"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous error
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <form
                    onSubmit={handleLogin}
                    className="glass-card p-10 rounded-3xl relative overflow-hidden flex flex-col gap-6"
                >
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3 font-medium mb-2"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-border">
                            <Lock className="text-[var(--primary)]" size={28} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Admin Access</h1>
                        <p className="text-white/40 text-sm mt-2 font-light uppercase tracking-widest">Ameerali K Portfolio</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Username</label>
                            <input
                                required
                                type="text"
                                placeholder="Enter admin username"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08]"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[var(--primary)] opacity-80">Password</label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-[var(--primary)] outline-none transition-all focus:bg-white/[0.08]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full bg-[var(--primary)] text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 neon-glow mt-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Login to Dashboard"
                        )}
                    </button>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.03] blur-3xl -z-10" />
                </form>
            </motion.div>
        </div>
    );
}
