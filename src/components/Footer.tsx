'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '@/lib/data';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-20 border-t border-border/50 relative overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                    <div className="space-y-6">
                        <motion.a
                            href="#"
                            className="text-2xl font-black tracking-tighter text-foreground"
                            whileHover={{ opacity: 0.7 }}
                        >
                            Deepak K<span className="text-primary">.</span>
                        </motion.a>
                        <p className="text-muted-foreground text-sm max-w-xs font-medium leading-relaxed">
                            Designing and developing world-class digital experiences with a
                            focus on performance and scalable data architectures.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialIcon href={socialLinks.github} icon={Github} />
                            <SocialIcon href={socialLinks.linkedin} icon={Linkedin} />
                            <SocialIcon href={`mailto:deepakkaruppasamy2005@gmail.com`} icon={Mail} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-20">
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Sitemap</h4>
                            <ul className="space-y-4">
                                <li><FooterLink href="#about">About</FooterLink></li>
                                <li><FooterLink href="#projects">Projects</FooterLink></li>
                                <li><FooterLink href="#skills">Skills</FooterLink></li>
                                <li><FooterLink href="#contact">Contact</FooterLink></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Social</h4>
                            <ul className="space-y-4">
                                <li><FooterLink href={socialLinks.linkedin}>LinkedIn</FooterLink></li>
                                <li><FooterLink href={socialLinks.leetcode}>LeetCode</FooterLink></li>
                                <li><FooterLink href={socialLinks.github}>GitHub</FooterLink></li>
                                <li><FooterLink href={socialLinks.salesforce}>Salesforce</FooterLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        © {currentYear} Deepak Karuppasamy. Built with Next.js & Tailwind.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Systems Operational</span>
                    </div>
                </div>
            </div>

            {/* Background Polish */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 -z-10" />
        </footer>
    );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)' }}
            className="p-3 bg-secondary/50 rounded-full border border-border/50 text-foreground transition-all"
        >
            <Icon size={18} />
        </motion.a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors block"
        >
            {children}
        </a>
    );
}
