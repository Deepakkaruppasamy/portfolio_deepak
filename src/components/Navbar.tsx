'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { socialLinks } from '@/lib/data';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Profiles', href: '#profiles' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

function MagneticLink({ children, href, onClick, active }: { children: ReactNode, href: string, onClick: any, active: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.5);
        y.set(middleY * 0.5);
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
            className="relative"
        >
            <a
                href={href}
                onClick={onClick}
                className={`px-5 py-2 text-sm font-black tracking-widest uppercase transition-colors relative z-10 ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
            >
                {children}
            </a>
            {active && (
                <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-x-1 inset-y-0.5 bg-background shadow-lg border border-border/50 rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                />
            )}
        </motion.div>
    );
}

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { theme, setTheme } = useTheme();
    const { scrollY } = useScroll();

    const headerHeight = useTransform(scrollY, [0, 100], ['5.5rem', '4rem']);
    const headerBg = useTransform(scrollY, [0, 100], ['rgba(var(--background), 0)', 'rgba(var(--background), 0.8)']);
    const headerBlur = useTransform(scrollY, [0, 100], ['0px', '20px']);
    const headerBorder = useTransform(scrollY, [0, 100], ['rgba(var(--border), 0)', 'rgba(var(--border), 0.5)']);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(`#${section}`);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    if (!mounted) return null;

    return (
        <motion.header
            style={{
                height: headerHeight,
                backgroundColor: headerBg,
                borderBottomColor: headerBorder.get()
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 backdrop-blur-xl border-b"
        >
            <div className="container-custom flex items-center justify-between w-full">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="text-2xl font-black tracking-tighter text-foreground group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-gradient group-hover:opacity-80 transition-opacity">DEEPAK</span>
                    <span className="text-primary text-3xl leading-none">.</span>
                </motion.a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center bg-secondary/20 rounded-full px-2 py-1.5 border border-border/40 backdrop-blur-xl">
                    <ul className="flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <MagneticLink
                                    href={link.href}
                                    onClick={(e: any) => handleNavClick(e, link.href)}
                                    active={activeSection === link.href}
                                >
                                    {link.name}
                                </MagneticLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 12 }}
                        whileTap={{ scale: 0.9, rotate: -12 }}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-3 rounded-2xl bg-secondary/50 border border-border/50 text-foreground transition-all hover:border-primary/50 relative group overflow-hidden"
                        aria-label="Toggle theme"
                    >
                        <div className="relative z-10">
                            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-400" />}
                        </div>
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-3 rounded-2xl bg-secondary/50 border border-border/50 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Cinematic Slide */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%', skewX: -5 }}
                            animate={{ x: 0, skewX: 0 }}
                            exit={{ x: '100%', skewX: 5 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:max-w-md bg-background border-l border-border z-50 lg:hidden p-12 flex flex-col pt-32"
                        >
                            <ul className="space-y-8">
                                {navLinks.map((link, i) => (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`text-4xl md:text-6xl font-black tracking-tighter uppercase transition-colors ${activeSection === link.href ? 'text-primary' : 'text-muted-foreground/40'
                                                }`}
                                        >
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-auto space-y-4">
                                <p className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground">Get in Touch</p>
                                <a href={`mailto:${socialLinks.email}`} className="text-2xl font-black hover:text-primary transition-colors">{socialLinks.email}</a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
