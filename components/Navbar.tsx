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
            className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 flex justify-between items-start max-w-[1400px] mx-auto pointer-events-none"
        >
            {/* 1. Left: Logo - Pointer events auto to allow clicking */}
            <div className="pointer-events-auto">
                <Link href="/" className="bg-[var(--primary)] text-black px-6 py-3 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity block">
                    Ameerali
                </Link>
            </div>

            {/* 2. Center: Navigation Links - Pointer events auto */}
            <div className="hidden md:flex pointer-events-auto bg-[#0a0f0d] text-white px-8 py-3 rounded-none items-center gap-8">
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

            {/* 3. Right: Contact Button - Pointer events auto */}
            <div className="hidden md:block pointer-events-auto">
                <Link
                    href="/contact"
                    className="bg-[var(--primary)] text-black px-6 py-3 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity block"
                >
                    Contact Now
                </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden pointer-events-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-black text-white p-3 hover:bg-black/90 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-20 left-4 right-4 bg-[#0a0f0d] text-white p-6 shadow-2xl pointer-events-auto z-50 flex flex-col gap-4 border-l-4 border-[var(--primary)]"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-xl font-medium hover:text-[var(--primary)] transition-colors ${link.name === "Contact" ? "text-[var(--primary)] font-bold" : ""}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name === "Contact" ? "Contact Now" : link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
