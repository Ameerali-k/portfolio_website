"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous error
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
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-xl border border-white/10 w-full max-w-sm relative overflow-hidden">
                {error && (
                    <div className="absolute top-0 left-0 w-full bg-red-500/20 text-red-500 p-3 text-sm flex items-center gap-2 justify-center font-bold">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <h1 className="text-2xl font-bold mb-6 text-center mt-4">Admin Login</h1>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/10 rounded p-2 text-white placeholder-white/30 focus:border-[var(--primary)] outline-none transition-colors"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full bg-white/10 border border-white/10 rounded p-2 text-white placeholder-white/30 focus:border-[var(--primary)] outline-none transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full bg-[var(--primary)] text-white py-2 rounded font-bold hover:bg-opacity-90 cursor-pointer transition-transform active:scale-95">
                    Login
                </button>
            </form>
        </div>
    );
}
