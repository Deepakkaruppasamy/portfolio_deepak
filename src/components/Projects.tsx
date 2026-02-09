'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Plus, Rocket, Sparkles, ChevronRight } from 'lucide-react';
import { featuredProjects } from '@/lib/data';
import { Project } from '@/lib/types';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectsProps {
    githubRepos?: any[];
}

export default function Projects({ githubRepos = [] }: ProjectsProps) {
    // Add non-featured repos from GitHub
    const extraProjects: Project[] = [];
    githubRepos.forEach((repo) => {
        const exists = featuredProjects.some(
            (p) => p.githubUrl.toLowerCase().includes(repo.name.toLowerCase())
        );
        if (!exists && !repo.fork && !repo.archived) {
            extraProjects.push({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                techStack: repo.language ? [repo.language] : [],
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                featured: false,
            });
        }
    });

    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Rocket className="text-primary" size={20} />
                        <h3 className="text-primary font-black tracking-[0.4em] uppercase text-xs">Innovation Lab</h3>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-2xl">
                            Building the<br />
                            <span className="text-gradient">Future</span> Web
                        </h2>
                        <p className="text-muted-foreground text-xl max-w-sm font-medium leading-relaxed italic border-l-2 border-primary/20 pl-6">
                            "Every line of code is an opportunity to create something extraordinary."
                        </p>
                    </div>
                </motion.div>

                {/* Asymmetrical Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                    {featuredProjects.map((project, index) => (
                        <FeaturedProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Extra Repos Section */}
                <div className="mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-border/50 flex-grow" />
                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground/60">Open Source Contributions</h3>
                        <div className="h-px bg-border/50 flex-grow" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {extraProjects.slice(0, 6).map((project, index) => (
                            <RepoCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {extraProjects.length > 6 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 text-center"
                    >
                        <motion.a
                            href="https://github.com/Deepakkaruppasamy"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-background border-2 border-border/60 rounded-xl font-black text-xs uppercase tracking-widest hover:border-primary transition-all inline-flex items-center gap-3 group"
                        >
                            <Github className="animate-bounce-subtle" size={20} />
                            View Full Archive
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.a>
                    </motion.div>
                )}
            </div>

            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
    const isLarge = index === 0;
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20 });

    const router = useRouter();

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

    const navigateToCaseStudy = () => {
        router.push(`/projects/${project.id}`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={navigateToCaseStudy}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ perspective: 1000, rotateX, rotateY }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative rounded-[4rem] overflow-hidden glass-card min-h-[550px] lg:min-h-[650px] p-10 md:p-16 flex flex-col justify-end shadow-2xl transition-shadow cursor-pointer hover:shadow-primary/10 ${isLarge ? 'lg:col-span-2' : ''
                }`}
        >
            {/* Background Graphic Component */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 transition-opacity opacity-0 group-hover:opacity-100 duration-1000" />
                {/* Animated Bokeh */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-60 transition-opacity"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 space-y-8 max-w-3xl">
                <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20 text-[10px] font-black tracking-[0.3em] text-primary uppercase shadow-inner">
                        Alpha Release
                    </div>
                    <Sparkles className="text-primary/40 group-hover:text-primary transition-colors animate-pulse" size={16} />
                </div>

                <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] transition-all transform group-hover:scale-[1.02] origin-left">
                    {project.name}
                </h3>

                <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-5 py-2 bg-secondary/80 backdrop-blur-md border border-border/40 rounded-2xl text-xs font-black tracking-widest uppercase text-foreground/80 hover:border-primary/40 hover:text-primary transition-all">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-6 pt-10">
                    <motion.a
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:shadow-primary/40 transition-shadow group/btn"
                    >
                        Experience Live
                        <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 px-10 py-5 bg-background/50 backdrop-blur-xl border-2 border-border/40 hover:border-primary text-foreground rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all"
                    >
                        <Github size={20} />
                        Study Source
                    </motion.a>

                    <button
                        className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] ml-auto group/case"
                    >
                        Full Case Study
                        <ChevronRight size={14} className="group-hover/case:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function RepoCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
            }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card group p-10 rounded-[3rem] flex flex-col hover:bg-secondary/40 transition-all border-border/40 hover:border-primary/40 cursor-default"
        >
            <div className="flex justify-between items-start mb-8" style={{ transform: 'translateZ(30px)' }}>
                <div className="p-4 bg-secondary shadow-inner rounded-3xl border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    <Github className="text-foreground h-8 w-8 group-hover:text-primary transition-colors" />
                </div>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 hover:bg-primary/10 rounded-full text-muted-foreground hover:text-primary transition-all"
                >
                    <ArrowUpRight size={28} />
                </a>
            </div>

            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors tracking-tight" style={{ transform: 'translateZ(40px)' }}>{project.name}</h3>
            <p className="text-muted-foreground text-lg font-medium line-clamp-3 mb-8 flex-grow leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                {project.description}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10 opacity-60 group-hover:opacity-100 transition-opacity" style={{ transform: 'translateZ(25px)' }}>
                {project.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] font-black tracking-[0.2em] uppercase text-primary border-b border-primary/20">
                        {tech}
                    </span>
                ))}
            </div>

            <a
                href={project.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-foreground hover:gap-5 transition-all group-hover:text-primary"
                style={{ transform: 'translateZ(30px)' }}
            >
                Review Documentation
                <Plus size={16} className="text-primary" />
            </a>
        </motion.div>
    );
}
