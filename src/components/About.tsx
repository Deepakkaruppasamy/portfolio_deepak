'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { languages, personalInfo } from '@/lib/data';

export default function About() {
    return (
        <section id="about" className="section-padding relative overflow-hidden bg-background">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    {/* Text Content - Slides from Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Sparkles size={20} className="text-primary" />
                                <h3 className="text-primary font-black tracking-[0.3em] uppercase text-xs">A Decade of Curiosity</h3>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                                Engineer <span className="text-muted-foreground/20">&</span> <br />
                                <span className="text-gradient font-black italic">Solution</span> Architect.
                            </h2>
                        </div>

                        <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                            <p>
                                Currently pursuing B.Tech in Information Technology at <span className="text-foreground font-black">Kongu Engineering College</span>.
                                My focus lies at the intersection of scalable cloud architectures and meaningful data insights.
                            </p>
                            <p className="border-l-4 border-primary pl-8 py-2 bg-primary/5 rounded-r-2xl italic">
                                "I don't just write code; I design systems that empower users and solve real-world complexities."
                            </p>

                            <div className="flex flex-wrap gap-x-10 gap-y-6 pt-6">
                                {['MERN Elite', 'Next.js 14 Expert', 'Data Visualizer', 'API Architect'].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm font-black tracking-widest text-foreground uppercase">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Cards Content - Slides from Right & Scale */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-[500px] shrink-0 space-y-8"
                    >
                        {/* Education Card - Premium Glassmorphism */}
                        <motion.div
                            whileHover={{ y: -10, rotate: -1 }}
                            className="glass-card p-10 rounded-[3rem] group transition-all duration-500 hover:border-primary/50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-colors" />
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="text-primary h-8 w-8" />
                                </div>
                                <div className="px-5 py-2 bg-secondary/80 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground shadow-inner">Academic Journey</div>
                            </div>
                            <h3 className="text-3xl font-black mb-2 tracking-tight">B.Tech IT</h3>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">Kongu Engineering College, Perundurai. Excellence in engineering and analytical thinking.</p>
                            <div className="flex items-center justify-between pt-8 border-t border-border/40">
                                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                                    <Calendar size={18} className="text-primary" />
                                    <span>2023 – 2027</span>
                                </div>
                                <div className="text-3xl font-black tracking-tighter text-primary">8.29 <span className="text-xs uppercase tracking-widest text-muted-foreground">CGPA</span></div>
                            </div>
                        </motion.div>

                        {/* Languages Card - Premium Glassmorphism */}
                        <motion.div
                            whileHover={{ y: -10, rotate: 1 }}
                            className="glass-card p-10 rounded-[3rem] transition-all duration-500 hover:border-indigo-500/50 relative overflow-hidden"
                        >
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full" />
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                    <Globe className="text-indigo-500 h-8 w-8" />
                                </div>
                                <div className="px-5 py-2 bg-secondary/80 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground shadow-inner">Communication</div>
                            </div>
                            <h3 className="text-3xl font-black mb-6 tracking-tight">Linguistic Versatility</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {languages.map((lang) => (
                                    <div key={lang} className="px-6 py-4 bg-secondary/50 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-border/40 hover:border-indigo-500/30 transition-all hover:bg-indigo-500/5">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Ambient Decors */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[180px] translate-x-1/2 -z-10" />
        </section>
    );
}
