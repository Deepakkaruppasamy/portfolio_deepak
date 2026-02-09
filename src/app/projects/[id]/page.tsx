'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Github,
    Globe,
    Code2,
    Cpu,
    Layers,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import { featuredProjects } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectDetail() {
    const { id } = useParams();
    const router = useRouter();
    const project = featuredProjects.find(p => p.id === Number(id));

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
                    <button onClick={() => router.push('/')} className="text-primary font-bold">Return Home</button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/#projects')}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group text-sm font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </motion.button>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="flex-1 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 text-primary"
                            >
                                <Sparkles size={20} className="animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-[0.4em]">Case Study</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                            >
                                {project.name}<span className="text-primary">.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                            >
                                {project.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4 pt-4"
                            >
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="px-8 py-4 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:shadow-2xl transition-all"
                                >
                                    <Github size={18} />
                                    Source Code
                                </a>
                                {project.liveUrl !== '#' && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        className="px-8 py-4 bg-secondary/50 border border-border/50 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:border-primary transition-all"
                                    >
                                        <Globe size={18} />
                                        Live Preview
                                    </a>
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                            className="lg:w-[450px] aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 to-indigo-500/20 glass-card p-12 flex items-center justify-center border-primary/20"
                        >
                            <Cpu size={120} className="text-primary opacity-20" />
                        </motion.div>
                    </div>
                </div>

                {/* Background Mesh */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
            </section>

            {/* Technical Breakdown */}
            <section className="section-padding bg-secondary/10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="p-4 w-fit rounded-2xl bg-primary/10 text-primary">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest opacity-70">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6 md:col-span-2"
                        >
                            <div className="p-4 w-fit rounded-2xl bg-indigo-500/10 text-indigo-500">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">Core Architecture</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                This project focuses on building a resilient and scalable system.
                                By leveraging modern architectural patterns like server-side rendering
                                with Next.js and secure data transactions via Supabase, the application
                                ensures low latency and high security for end-users.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {['RESTful API integration', 'Automated data synchronization', 'Premium interactive UI patterns'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground">
                                        <ChevronRight size={16} className="text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
