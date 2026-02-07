"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail, Palette, Code, Monitor, Video, Figma, Image as ImageIcon, Layers, Layout, Database, Globe } from "lucide-react";

const TITLES = [
    "Graphic Designer",
    "Web Developer",
    "Presentation Designer",
    "Video Editor"
];

const EXPERTISE = [
    { name: 'Photoshop', icon: ImageIcon },
    { name: 'Illustrator', icon: Palette },
    { name: 'Premiere Pro', icon: Video },
    { name: 'After Effects', icon: Layers },
    { name: 'Figma', icon: Figma },
    { name: 'Next.js', icon: Globe },
    { name: 'React', icon: Code },
    { name: 'Tailwind', icon: Layout },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Wordpress', icon: Monitor },
];

export default function LandingContent({ recentWorks }: { recentWorks: any[] }) {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Scroll functions for expertise carousel
    const scrollExpertise = (direction: 'left' | 'right') => {
        const scrollContainer = document.querySelector('.expertise-scroll');
        if (!scrollContainer) return;

        // Get the first expertise item to calculate its width
        const firstItem = scrollContainer.querySelector('.expertise-item');
        if (!firstItem) return;

        // Calculate item width including gap (16px = gap-4)
        const itemWidth = firstItem.getBoundingClientRect().width + 16;

        scrollContainer.scrollBy({
            left: direction === 'left' ? -itemWidth : itemWidth,
            behavior: 'smooth'
        });
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative text-center hero-bg overflow-hidden -mx-6 px-6" >
                <div className="hero-gradient-overlay" />

                {/* Floating Pixel Elements (Left) */}
                <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-transparent" />
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-black/10" />
                    </div>
                </div>

                {/* Floating Pixel Elements (Right) */}
                <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-12 h-12 bg-transparent" />
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-black/10" />
                        <div className="w-12 h-12 bg-transparent" />
                        <div className="w-12 h-12 bg-black/10" />
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="z-10 flex flex-col items-center max-w-4xl mx-auto w-full"
                >
                    {/* Title */}
                    <motion.h1 variants={item} className="text-5xl md:text-7xl font-medium mb-4 text-black tracking-tight">
                        I am <span className="font-semibold">Ameerali</span>
                    </motion.h1>

                    <motion.h2 variants={item} className="text-3xl md:text-5xl font-light mb-12 text-black/80">
                        Graphic Designer
                    </motion.h2>

                    {/* Central Image & Clients Badge */}
                    <div className="relative w-full flex justify-center items-center mb-12">
                        {/* Profile Image */}
                        <motion.div
                            variants={item}
                            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 border-8 border-white shadow-2xl relative z-10 overflow-hidden"
                        >
                            <img
                                src="/profile.jpg"
                                alt="Ameerali K"
                                className="w-full h-full object-center object-cover"
                            />
                        </motion.div>

                        {/* Clients Badge (Right side of image) */}
                        <motion.div
                            variants={item}
                            className="absolute right-0 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20"
                        >
                            <div className="flex -space-x-4 mb-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white" />
                                ))}
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-black">+100</span>
                                <span className="text-xs font-medium text-black/60 uppercase tracking-widest">Clients</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p variants={item} className="text-lg md:text-xl text-black/70 mb-10 max-w-2xl leading-relaxed font-medium">
                        Creating refined digital experiences through minimalist design and performance-driven development, serving clients worldwide.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={item}>
                        <Link
                            href="/portfolio"
                            className="bg-[var(--primary)] text-black px-10 py-4 font-bold text-lg tracking-wide hover:scale-105 transition-transform shadow-lg shadow-[#88ff00]/20"
                        >
                            View Projects
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* About Section */}
            <section className="py-32 relative" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-20 items-center"
                >
                    <div className="relative">
                        <div className="absolute -left-10 top-0 text-[10rem] font-black text-white/[0.02] select-none leading-none">
                            BIO
                        </div>
                        <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                            <span className="w-12 h-1 bg-[var(--primary)] block"></span> About
                        </h2>
                        <p className="text-xl opacity-80 mb-8 leading-relaxed font-light">
                            With over <span className="text-[var(--primary)] font-bold">six years</span> of experience, I merge technical precision with creative vision. Currently leading aesthetic excellence at Strategic Exhibitions & Marketing, Dubai.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                            {[
                                "MBA in Marketing & Finance",
                                "B.Com Computer Application",
                                "Microsoft Office Specialist",
                                "Google Analytics Certified"
                            ].map((edu) => (
                                <div key={edu} className="flex items-center gap-3 opacity-70 group hover:opacity-100 transition-opacity">
                                    <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full" />
                                    {edu}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.05] blur-3xl group-hover:opacity-20 transition-opacity" />
                        <h3 className="text-2xl font-bold mb-8 text-[var(--primary)] tracking-widest uppercase">Expertise</h3>

                        {/* Scrollable Container */}
                        <div className="expertise-scroll flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x hide-scrollbar mask-gradient">
                            {EXPERTISE.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="expertise-item flex-shrink-0 snap-start relative group/skill"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-transparent opacity-0 group-hover/skill:opacity-20 blur-xl transition-opacity duration-500 rounded-xl" />
                                    <div className="relative px-6 py-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[var(--primary)] hover:bg-white/10 transition-all cursor-default">
                                        <skill.icon className="w-5 h-5 text-[var(--primary)]" />
                                        <span className="text-sm font-medium text-white group-hover/skill:text-[var(--primary)] transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Recent Works */}
            <section className="py-32" >
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black flex items-center gap-4 mb-4">
                            <span className="w-12 h-1 bg-[var(--primary)] block"></span> Works
                        </h2>
                        <p className="opacity-60 text-lg">A selection of recent digital experiences.</p>
                    </motion.div>
                    <Link href="/portfolio" className="group flex items-center gap-3 text-lg font-bold border-b border-white/20 pb-2 hover:border-[var(--primary)] transition-colors">
                        Explore All <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {recentWorks.length > 0 ? (
                        recentWorks.map((work, i) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card mb-6 p-2">
                                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                                        <img
                                            src={work.imageUrl}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors" />
                                    </div>
                                </div>
                                <div className="px-2">
                                    <span className="text-xs font-black text-[var(--primary)] tracking-[0.2em] uppercase mb-3 block">{work.category || "Design"}</span>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">{work.title}</h3>
                                    <p className="text-white/50 line-clamp-2 font-light leading-relaxed">{work.description}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="opacity-50 italic">Portfolio pieces launching soon...</p>
                    )}
                </div>
            </section>
        </div>
    );
}
