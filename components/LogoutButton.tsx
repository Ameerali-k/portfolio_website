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
            className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 hover:text-red-500 transition-colors"
        >
            <LogOut size={16} /> Logout
        </button>
    );
}
