"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        { name: "About", href: "/about" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
    ];


    return (
        <nav
            ref={navRef}
            className="fixed top-4 left-4 right-4 max-w-7xl lg:mx-auto z-50 rounded-2xl glass-card bg-black/40 border border-white/5 px-6"
        >
            <div className="flex justify-between items-center h-20">
                {/* 1. Left: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-[var(--foreground)]">
                        AMEERALI<span className="text-[var(--primary)]">.</span>
                    </Link>
                </div>

                {/* 2. Center: Navigation Links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 items-center">
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-0 right-0 mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 shadow-2xl overflow-hidden"
                    >
                        {links.filter(l => l.name !== "Contact").map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium hover:text-[var(--primary)] px-6 py-4 rounded-2xl hover:bg-white/5 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-[var(--primary)] text-black text-center py-4 rounded-2xl font-black uppercase tracking-widest text-sm mx-2 mt-2 hover:scale-[1.02] active:scale-95 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
