'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Code2,
    Briefcase,
    User,
    Mail,
    ExternalLink,
    ChevronRight,
    Terminal,
    Cpu
} from 'lucide-react';
import { featuredProjects, skills } from '@/lib/data';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        command();
        setOpen(false);
    };

    const navTo = (id: string) => {
        runCommand(() => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                        onClick={() => setOpen(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-2xl pointer-events-auto"
                        >
                            <Command className="glass-card rounded-3xl overflow-hidden border-border/40 shadow-2xl bg-card/90">
                                <div className="flex items-center border-b border-border/40 px-6">
                                    <Search className="mr-4 text-muted-foreground" size={20} />
                                    <Command.Input
                                        placeholder="Search for projects, skills, or transmit commands..."
                                        className="flex h-16 w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
                                    />
                                    <div className="ml-4 px-2 py-1 rounded-lg bg-secondary/50 border border-border/50 text-[10px] font-black text-muted-foreground">
                                        ESC
                                    </div>
                                </div>

                                <Command.List className="max-h-[min(400px,70vh)] overflow-y-auto p-4 custom-scrollbar">
                                    <Command.Empty className="py-12 text-center text-muted-foreground font-medium italic">
                                        No results found for this transmission.
                                    </Command.Empty>

                                    <Command.Group heading={<span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-2">Navigation</span>}>
                                        <Item onSelect={() => navTo('about')} icon={User} title="About" subtitle="Learn more about my background" />
                                        <Item onSelect={() => navTo('skills')} icon={Code2} title="Skills" subtitle="Explore my technical arsenal" />
                                        <Item onSelect={() => navTo('projects')} icon={Briefcase} title="Projects" subtitle="View my latest builds" />
                                        <Item onSelect={() => navTo('contact')} icon={Mail} title="Contact" subtitle="Initiate a dialogue" />
                                    </Command.Group>

                                    <Command.Group heading={<span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-6 mb-2 block ml-2">Projects</span>}>
                                        {featuredProjects.map((project) => (
                                            <Item
                                                key={project.id}
                                                onSelect={() => runCommand(() => window.open(project.githubUrl, '_blank'))}
                                                icon={Cpu}
                                                title={project.name}
                                                subtitle={project.techStack.join(', ')}
                                            />
                                        ))}
                                    </Command.Group>

                                    <Command.Group heading={<span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-6 mb-2 block ml-2">Technical Skills</span>}>
                                        {skills.map((category) => (
                                            <Item
                                                key={category.category}
                                                onSelect={() => navTo('skills')}
                                                icon={Terminal}
                                                title={category.category}
                                                subtitle={category.items.join(', ')}
                                            />
                                        ))}
                                    </Command.Group>
                                </Command.List>

                                <div className="bg-secondary/40 px-6 py-4 border-t border-border/40 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <kbd className="px-2 py-1 rounded bg-background border border-border text-[9px] font-black">↑↓</kbd>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Navigate</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <kbd className="px-2 py-1 rounded bg-background border border-border text-[9px] font-black">ENTER</kbd>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Select</span>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">Deepak OS v1.2</span>
                                </div>
                            </Command>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function Item({ icon: Icon, title, subtitle, onSelect }: any) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary aria-selected:bg-primary transition-all group"
        >
            <div className="p-3 rounded-xl bg-secondary group-data-[selected=true]:bg-white/20 transition-colors">
                <Icon size={18} className="text-foreground group-data-[selected=true]:text-white" />
            </div>
            <div className="flex-1 flex flex-col">
                <span className="text-sm font-black tracking-tight group-data-[selected=true]:text-white">{title}</span>
                <span className="text-xs text-muted-foreground group-data-[selected=true]:text-white/70 line-clamp-1">{subtitle}</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground group-data-[selected=true]:text-white" />
        </Command.Item>
    );
}
