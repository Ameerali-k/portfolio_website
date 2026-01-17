"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";

export default function LandingContent({ recentWorks }: { recentWorks: any[] }) {
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
        <div className="container mx-auto px-6">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col justify-center relative">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl"
                >
                    <motion.h2 variants={item} className="text-[var(--primary)] font-bold mb-4 tracking-widest text-sm uppercase">
                        Start. Create. Innovate.
                    </motion.h2>
                    <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        I am Ameerali K.<br />
                        <span className="text-white/80">Graphic Designer & Web Developer</span>
                    </motion.h1>
                    <motion.p variants={item} className="text-xl opacity-70 mb-8 max-w-2xl leading-relaxed">
                        Based in Dubai. Creating visually compelling graphics and developing user-friendly websites that enhance brand identity.
                    </motion.p>
                    <motion.div variants={item} className="flex gap-4">
                        <Link
                            href="/portfolio"
                            className="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
                        >
                            View Portfolio <ArrowRight size={18} />
                        </Link>
                        <a
                            href="mailto:ameeralikprm@gmail.com"
                            className="border border-white/20 hover:border-[var(--primary)] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:text-[var(--primary)]"
                        >
                            Contact Me <Mail size={18} />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Decorative Circle */}
                <div className="absolute top-1/2 right-10 w-96 h-96 bg-[var(--primary)] rounded-full blur-[120px] opacity-20 -z-10 animate-pulse pointer-events-none" />
            </section>

            {/* About Section */}
            <section className="py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-[var(--primary)] block"></span> About Me
                        </h2>
                        <p className="text-lg opacity-80 mb-6 leading-relaxed">
                            With over six years of experience, I specialize in design software like Photoshop, Illustrator, and After Effects, alongside web development mastery in React, Next.js, and WordPress. Currently working as a Senior Graphic Designer at Strategic Exhibitions & Marketing in Dubai.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm font-semibold opacity-70">
                            <div className="flex items-center gap-2">✔ MBA in Marketing & Finance</div>
                            <div className="flex items-center gap-2">✔ B.Com Computer Application</div>
                            <div className="flex items-center gap-2">✔ Microsoft Office Specialist</div>
                            <div className="flex items-center gap-2">✔ Google Analytics Certified</div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="font-bold mb-4 text-[var(--primary)]">Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Figma', 'Next.js', 'React', 'Tailwind', 'PostgreSQL', 'Wordpress'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-[var(--primary)] hover:text-white transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Recent Works */}
            <section className="py-20">
                <div className="flex justify-between items-end mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold flex items-center gap-2"
                    >
                        <span className="w-8 h-1 bg-[var(--primary)] block"></span> Recent Works
                    </motion.h2>
                    <Link href="/portfolio" className="text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
                        View More <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {recentWorks.length > 0 ? (
                        recentWorks.map((work, i) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
                            >
                                <div className="aspect-video bg-black/50 relative overflow-hidden">
                                    {/* Placeholder for real image or next/image */}
                                    <img
                                        src={work.imageUrl}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-[var(--primary)] mb-2 block">{work.category || "Design"}</span>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{work.title}</h3>
                                    <p className="text-sm opacity-60 line-clamp-2">{work.description}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="opacity-50">No recent works to display. (Seed DB to see items)</p>
                    )}
                </div>
            </section>
        </div>
    );
}
