"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl flex items-center gap-2 font-bold uppercase tracking-widest text-sm bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all hover:scale-[1.02] active:scale-95"
        >
            <LogOut size={16} /> Logout
        </button>
    );
}
