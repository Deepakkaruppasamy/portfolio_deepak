'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Code2, Award, ExternalLink, Github, Globe } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { useRef } from 'react';

const profiles = [
    {
        name: 'LinkedIn',
        label: 'Network',
        url: socialLinks.linkedin,
        icon: Linkedin,
        color: 'from-[#0077b5] to-[#00a0dc]',
        description: 'Bridging technical engineering with professional storytelling.'
    },
    {
        name: 'LeetCode',
        label: 'Algorithmic',
        url: socialLinks.leetcode,
        icon: Code2,
        color: 'from-[#FFA116] to-[#FFD07F]',
        description: 'A playground for data structure mastery and edge-case logic.'
    },
    {
        name: 'Salesforce',
        label: 'Cloud Native',
        url: socialLinks.salesforce,
        icon: Award,
        color: 'from-[#00A1E0] to-[#6EBFF3]',
        description: 'Architecting scalable cloud solutions with AI integration.'
    },
    {
        name: 'GitHub',
        label: 'Open Source',
        url: socialLinks.github,
        icon: Github,
        color: 'from-[#24292e] to-[#444d56]',
        description: 'The laboratory where raw ideas transform into production code.'
    }
];

export default function PlatformProfiles() {
    return (
        <section id="profiles" className="section-padding relative overflow-hidden bg-background">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-32"
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Globe className="text-primary animate-spin-slow" size={24} />
                        <h3 className="text-primary font-black tracking-[0.5em] uppercase text-xs">Global Reach</h3>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
                        Professional <br />
                        <span className="text-gradient font-black">Ecosystem</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        Consistently contributing to the global developer community through code, mentorship, and cloud innovation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {profiles.map((profile, index) => (
                        <ProfileCard key={profile.name} profile={profile} index={index} />
                    ))}
                </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10 opacity-30" />
        </section>
    );
}

function ProfileCard({ profile, index }: { profile: any; index: number }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20 });

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
        <motion.a
            ref={cardRef}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            style={{ perspective: 1000, rotateX, rotateY }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card group p-12 rounded-[3.5rem] flex flex-col items-center text-center relative overflow-hidden shadow-2xl transition-all hover:bg-white/5 dark:hover:bg-black/20"
        >
            {/* Dynamic Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000`} />

            <div className={`p-6 rounded-[2rem] bg-gradient-to-br ${profile.color} opacity-10 group-hover:opacity-20 transition-all mb-10 group-hover:scale-110 duration-500 shadow-xl group-hover:rotate-12`}>
                <profile.icon size={48} className="text-foreground" />
            </div>

            <h3 className="text-3xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">{profile.name}</h3>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/60 mb-8 border-b border-primary/10 pb-2">{profile.label}</p>

            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-12 flex-grow">
                {profile.description}
            </p>

            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-background/50 px-6 py-3 rounded-2xl border border-border/40 group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-inner">
                Observe Profile
                <ExternalLink size={16} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            {/* Hover Edge Detection Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${profile.color} opacity-0 blur-[60px] group-hover:opacity-20 transition-opacity duration-700`} />
        </motion.a>
    );
}
