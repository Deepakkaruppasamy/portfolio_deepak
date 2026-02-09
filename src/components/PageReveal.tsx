'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PageReveal({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial asset load
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{
                            y: '-100%',
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                        className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 200 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="h-[2px] bg-background"
                            />
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-background text-[10px] font-black tracking-[0.5em] uppercase"
                            >
                                Deepak K. - System Init
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{
                    opacity: loading ? 0 : 1,
                    filter: loading ? 'blur(10px)' : 'blur(0px)',
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }}
            >
                {children}
            </motion.div>
        </>
    );
}
