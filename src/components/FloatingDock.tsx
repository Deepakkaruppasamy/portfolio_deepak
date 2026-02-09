'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
    User,
    Terminal as TerminalIcon,
    Code2,
    Briefcase,
    Award,
    Mail,
    Home
} from 'lucide-react';
import { useRef, useState } from 'react';

const links = [
    { title: "Home", icon: Home, href: "#" },
    { title: "About", icon: User, href: "#about" },
    { title: "Skills", icon: Code2, href: "#skills" },
    { title: "Projects", icon: Briefcase, href: "#projects" },
    { title: "Experience", icon: Award, href: "#achievements" },
    { title: "Contact", icon: Mail, href: "#contact" },
];

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex h-20 items-center justify-center gap-4 rounded-3xl bg-black/20 dark:bg-white/5 px-6 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 pointer-events-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            {links.map((link) => (
                <IconContainer mouseX={mouseX} key={link.title} {...link} />
            ))}
        </motion.div>
    );
}

function IconContainer({ mouseX, title, icon: Icon, href }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [45, 80, 45]);

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <a href={href} onClick={(e) => {
            if (href === "#") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex items-center justify-center rounded-2xl bg-secondary/30 border border-white/10 transition-colors hover:bg-primary/20 hover:border-primary/50"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-12 left-1/2 w-fit px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <Icon className="text-foreground shrink-0" size={20} />
            </motion.div>
        </a>
    );
}
