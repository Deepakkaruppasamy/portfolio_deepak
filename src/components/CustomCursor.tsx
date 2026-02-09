'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('data-cursor') === 'pointer'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Global Spotlight Lighting */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[1] hidden md:block"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -300,
                    top: -300,
                    background: 'radial-gradient(circle, hsla(var(--primary), 0.08) 0%, transparent 70%)',
                }}
            />

            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] hidden md:block mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -16,
                    top: -16,
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? 'rgba(var(--primary-rgb), 0.2)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
            >
                <motion.div
                    animate={{ scale: isHovered ? 0.2 : 1 }}
                    className="absolute inset-x-0 inset-y-0 m-auto w-1 h-1 bg-primary rounded-full"
                />
            </motion.div>
        </>
    );
}
