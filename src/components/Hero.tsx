'use client';

import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Code2, Award, MapPin } from 'lucide-react';
import { socialLinks, personalInfo } from '@/lib/data';
import { useRef, ReactNode } from 'react';
import DevTerminal from './DevTerminal';

// Magnetic Button Wrapper for premium micro-interactions
function Magnetic({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.35);
        y.set(middleY * 0.35);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
    },
};

const wordReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * i,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const nameWords = personalInfo.name.split(' ');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient pb-20 pt-32 md:pt-40">
            <div className="container-custom relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
                    >
                        {/* Status Reveal */}
                        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span>Available for world-class projects</span>
                        </motion.div>

                        {/* Location Reveal */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground mb-6">
                            <MapPin size={16} className="text-primary animate-bounce-subtle" />
                            <span className="text-sm font-black tracking-[0.2em] uppercase">{personalInfo.location}</span>
                        </motion.div>

                        {/* Cinematic Heading Reveal */}
                        <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-8">
                            <div className="overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-4">
                                {nameWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordReveal}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={wordReveal}
                                    custom={nameWords.length}
                                    className="text-primary text-gradient"
                                >
                                    .
                                </motion.span>
                            </div>
                            <motion.div variants={itemVariants} className="mt-2 h-1 bg-gradient-to-r from-primary via-indigo-500 to-transparent w-24 rounded-full mx-auto lg:mx-0" />
                            <motion.span variants={itemVariants} className="block text-4xl md:text-6xl lg:text-7xl text-muted-foreground/30 dark:text-muted-foreground/10 mt-4 leading-tight">
                                Full Stack & <span className="text-gradient">Analyst</span>
                            </motion.span>
                        </motion.h1>

                        {/* Description Stagger */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium mx-auto lg:mx-0"
                        >
                            Architecting high-performance digital experiences and
                            intelligent data solutions. Bridging the gap between
                            <span className="text-foreground font-black"> engineering logic</span> and
                            <span className="text-primary font-black italic"> visual excellence</span>.
                        </motion.p>

                        {/* Magnetic CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-8 items-center lg:items-start mb-16"
                        >
                            <Magnetic>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={scrollToProjects}
                                    className="px-10 py-5 bg-foreground text-background rounded-full font-black text-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-primary/30 transition-shadow flex items-center gap-3 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Launch Projects</span>
                                    <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                                </motion.button>
                            </Magnetic>

                            <Magnetic>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/certificates/resume.pdf"
                                    download
                                    className="px-10 py-5 bg-background/50 border-2 border-border/60 hover:border-primary text-foreground rounded-full font-black text-lg backdrop-blur-md transition-all flex items-center gap-3 group"
                                >
                                    <Download className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                    Resume
                                </motion.a>
                            </Magnetic>
                        </motion.div>

                        {/* Profile Links Reveal */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-6"
                        >
                            <SocialBadge href={socialLinks.linkedin} icon={Linkedin} label="LinkedIn" />
                            <SocialBadge href={socialLinks.leetcode} icon={Code2} label="LeetCode" />
                            <SocialBadge href={socialLinks.github} icon={Github} label="GitHub" />
                        </motion.div>
                    </motion.div>

                    {/* Cinematic Hero Image & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex-1 w-full lg:max-w-xl"
                    >
                        <DevTerminal />

                        {/* Ambient Background Elements */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3],
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.1, 0.2, 0.1],
                                x: [0, -40, 0],
                                y: [0, 60, 0],
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SocialBadge({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, backgroundColor: 'var(--accent)' }}
            className="flex items-center gap-3 px-6 py-3 bg-secondary/50 border border-border/40 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
            <Icon size={18} className="text-foreground" />
            <span>{label}</span>
        </motion.a>
    );
}
