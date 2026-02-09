'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Code2,
    Terminal,
    Database,
    Cpu,
    BarChart,
    Layers,
    Sparkles
} from 'lucide-react';
import { skills } from '@/lib/data';

const iconMap: Record<string, any> = {
    'Frontend': Code2,
    'Backend': Terminal,
    'Databases': Database,
    'Languages': Cpu,
    'Data & AI/ML': BarChart,
    'Tools & Platforms': Layers,
};

const colors: Record<string, string> = {
    'Frontend': 'from-blue-600 via-cyan-400 to-transparent',
    'Backend': 'from-indigo-600 via-violet-400 to-transparent',
    'Databases': 'from-emerald-600 via-teal-400 to-transparent',
    'Languages': 'from-amber-600 via-orange-400 to-transparent',
    'Data & AI/ML': 'from-rose-600 via-pink-400 to-transparent',
    'Tools & Platforms': 'from-primary via-indigo-400 to-transparent',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100,
        },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="section-padding bg-background relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-32"
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="h-px w-12 bg-primary/20" />
                        <Sparkles className="text-primary animate-pulse" size={24} />
                        <h3 className="text-primary font-black tracking-[0.5em] uppercase text-xs">Technical Arsenal</h3>
                        <div className="h-px w-12 bg-primary/20" />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
                        Dominating <br />
                        <span className="text-gradient">Modern Tech</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        Meticulously selected tech stack designed for speed, scale, and high-fidelity user experiences.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {skills.map((category) => (
                        <SkillCategoryCard
                            key={category.category}
                            category={category}
                            icon={iconMap[category.category] || Code2}
                        />
                    ))}
                </motion.div>

                {/* Section Divider Line Draw */}
                <div className="mt-40 relative flex justify-center">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-background border border-border/50 rounded-full"
                    >
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Sparkles className="text-primary" size={16} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SkillCategoryCard({ category, icon: Icon }: { category: any; icon: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 200 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });

    function handleMouseMove(event: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={itemVariants}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
            }}
            className="glass-card group p-10 rounded-[3rem] relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border-border/40 hover:border-primary/40 h-full flex flex-col cursor-default"
        >
            {/* Visual Accent - Top Line */}
            <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors[category.category]} opacity-30 group-hover:opacity-100 transition-opacity`}
                style={{ transform: 'translateZ(20px)' }}
            />

            <div className="flex items-center gap-6 mb-10" style={{ transform: 'translateZ(30px)' }}>
                <div className={`p-5 rounded-2xl bg-secondary/50 border border-border/50 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                    <Icon size={32} className="text-foreground transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">{category.category}</h3>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto" style={{ transform: 'translateZ(40px)' }}>
                {category.items.map((skill: string) => (
                    <motion.div
                        key={skill}
                        whileHover={{
                            scale: 1.1,
                            y: -2,
                            backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                            borderColor: 'rgba(var(--primary-rgb), 0.3)'
                        }}
                        className="px-5 py-2 bg-secondary/40 border border-border/50 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-all cursor-pointer shadow-sm shadow-black/5"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>

            {/* Animated Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.08, 0.05]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors[category.category]} blur-[50px] -z-10`}
            />
        </motion.div>
    );
}
