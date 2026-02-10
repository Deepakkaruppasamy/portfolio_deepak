'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, FileCheck, X, ExternalLink, Trophy, BadgeCheck, Sparkles } from 'lucide-react';
import { achievements, certifications } from '@/lib/data';

export default function Achievements() {
    const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
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
                        <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                            Milestones<span className="text-muted-foreground/20"> & </span>Awards
                        </h2>
                        <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium leading-relaxed">
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
                                        className="glass-card group p-8 rounded-[2.5rem] relative overflow-hidden hover:border-amber-500/30 transition-all duration-500"
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
                                                <motion.button
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedCertificate(item.certificateUrl!)}
                                                    className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors"
                                                >
                                                    Verify Credential
                                                    <ExternalLink size={18} className="text-amber-500" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Certifications */}
                        <div className="lg:col-span-6 space-y-12 lg:mt-32">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
                                    <BadgeCheck className="text-primary" size={32} />
                                </div>
                                <h3 className="text-4xl font-black tracking-tight">Certifications</h3>
                            </div>

                            <div className="grid gap-6">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        onClick={() => setSelectedCertificate(cert.certificateUrl)}
                                        className="glass-card group p-8 rounded-3xl cursor-pointer flex items-center justify-between border-border/40 hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5"
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
                                            animate={{ rotate: [0, 90, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="text-muted-foreground/20 group-hover:text-primary transition-colors"
                                        >
                                            <Sparkles size={24} />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic Modal */}
            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCertificate(null)}
                        className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50, rotateX: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)] bg-card border border-border/50 aspect-[16/10] md:aspect-video flex flex-col"
                        >
                            {/* Header with Close and Download */}
                            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-4 z-20">
                                <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={selectedCertificate}
                                    download
                                    className="p-3 md:p-4 bg-primary text-primary-foreground rounded-full transition-all shadow-xl backdrop-blur-md flex items-center justify-center"
                                    title="Download Certificate"
                                >
                                    <ExternalLink size={20} />
                                </motion.a>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedCertificate(null)}
                                    className="p-3 md:p-4 bg-background/50 hover:bg-foreground hover:text-background rounded-full transition-all shadow-xl backdrop-blur-md flex items-center justify-center"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            <div className="flex-1 w-full h-full bg-muted/5 relative">
                                <object
                                    data={`${selectedCertificate}#toolbar=0&navpanes=0&scrollbar=0`}
                                    type="application/pdf"
                                    className="w-full h-full border-0"
                                >
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                        <FileCheck size={64} className="text-secondary mb-6 opacity-20" />
                                        <h3 className="text-2xl font-black mb-4">View Certificate</h3>
                                        <p className="text-muted-foreground mb-8 max-w-md">Your browser doesn't support direct PDF viewing. You can download the certificate to view it or open it in a new tab.</p>
                                        <a
                                            href={selectedCertificate}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
                                        >
                                            Open in New Tab
                                        </a>
                                    </div>
                                </object>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
