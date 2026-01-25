"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    const links = [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-4 left-0 right-0 max-w-7xl mx-auto z-50 rounded-2xl glass-card bg-black/40 border border-white/5 px-6"
        >
            <div className="flex justify-between items-center h-20">
                {/* 1. Left: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-[var(--foreground)]">
                        AMEERALI<span className="text-[var(--primary)]">.</span>
                    </Link>
                </div>

                {/* 2. Center: Navigation Links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 items-center bg-white/5 px-8 py-3 rounded-full border border-white/5">
                    {links.filter(l => l.name !== "Contact").map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-[var(--primary)] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* 3. Right: Contact Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="bg-[var(--primary)] text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full mt-2 bg-black border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-lg overflow-hidden">
                    {links.filter(l => l.name !== "Contact").map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium hover:text-[var(--primary)] px-4 py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-[var(--primary)] text-black text-center py-3 rounded-xl font-bold uppercase tracking-wider mx-4 mb-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact Me
                    </Link>
                </div>
            )}
        </nav>
    );
}
