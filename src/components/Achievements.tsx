'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, FileCheck, ExternalLink, Trophy, BadgeCheck, Sparkles } from 'lucide-react';
import { achievements, certifications } from '@/lib/data';

export default function Achievements() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <section id="achievements" className="section-padding relative overflow-hidden bg-secondary/5">
                <div className="container-custom" ref={containerRef}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-32"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="text-primary animate-pulse" size={20} />
                            <h3 className="text-primary font-black tracking-[0.4em] uppercase text-xs">Path of Growth</h3>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 md:mb-8">
                            Milestones<span className="text-muted-foreground/20"> & </span>Awards
                        </h2>
                        <p className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            A track record of excellence in technical innovation,
                            academic achievements, and industry-standard certifications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                        {/* Timeline Scroll Progress Line */}
                        <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-border/40 hidden md:block">
                            <motion.div
                                style={{ height: lineHeight }}
                                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-indigo-500 to-transparent origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            />
                        </div>

                        {/* Left Column - Hackathons */}
                        <div className="lg:col-span-6 space-y-12">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-lg shadow-amber-500/5">
                                    <Trophy className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-4xl font-black tracking-tight">Hackathons</h3>
                            </div>

                            <div className="space-y-10">
                                {achievements.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        className="glass-card group p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden hover:border-amber-500/30 transition-all duration-500"
                                    >
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-colors" />

                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black tracking-[0.3em] uppercase px-4 py-1.5 bg-secondary text-muted-foreground rounded-full">
                                                    {item.date}
                                                </span>
                                                <Award className="text-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" size={24} />
                                            </div>

                                            <h4 className="text-3xl font-black tracking-tight group-hover:text-amber-500 transition-colors leading-[1.1]">
                                                {item.title}
                                            </h4>

                                            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                                                {item.description}
                                            </p>

                                            {item.certificateUrl && (
                                                <motion.a
                                                    href={item.certificateUrl}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors"
                                                >
                                                    Verify Credential
                                                    <ExternalLink size={18} className="text-amber-500" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Certifications */}
                        <div className="lg:col-span-6 space-y-12">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
                                    <BadgeCheck className="text-primary" size={32} />
                                </div>
                                <h3 className="text-4xl font-black tracking-tight">Certifications</h3>
                            </div>

                            <div className="grid gap-6">
                                {certifications.map((cert, index) => (
                                    <motion.a
                                        key={cert.id}
                                        href={cert.certificateUrl}
                                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="glass-card group p-6 md:p-8 rounded-2xl md:rounded-3xl cursor-pointer flex items-center justify-between border-border/40 hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors ring-1 ring-primary/10">
                                                <FileCheck className="text-primary" size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black group-hover:text-primary transition-colors mb-1">{cert.title}</h4>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs uppercase font-black tracking-widest text-muted-foreground">{cert.issuer}</span>
                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                                    <span className="text-xs font-bold text-muted-foreground">{cert.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.div
                                            className="text-muted-foreground/40 group-hover:text-primary transition-colors flex items-center gap-2"
                                        >
                                            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">View</span>
                                            <FileCheck size={24} />
                                        </motion.div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
