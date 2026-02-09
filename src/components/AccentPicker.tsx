'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { useAccent, accents } from './AccentProvider';

export default function AccentPicker() {
    const { currentAccent, setAccent } = useAccent();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-24 right-6 z-[60]">
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 rounded-2xl bg-secondary/50 border border-border/50 text-foreground backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all relative group overflow-hidden"
                    aria-label="Change accent color"
                >
                    <div className="relative z-10">
                        <Palette size={20} className="text-primary transition-transform group-hover:rotate-12" />
                    </div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                            className="absolute top-full mt-4 right-0 glass flex flex-col gap-3 p-4 rounded-3xl border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[200px]"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-2">Select Mood</p>
                            <div className="grid grid-cols-3 gap-2">
                                {accents.map((accent) => (
                                    <motion.button
                                        key={accent.name}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setAccent(accent);
                                            setIsOpen(false);
                                        }}
                                        className="relative group"
                                        title={accent.name}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl border border-white/10 shadow-inner"
                                            style={{ backgroundColor: `hsl(${accent.h}, ${accent.s}%, ${accent.l}%)` }}
                                        />
                                        {currentAccent.name === accent.name && (
                                            <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                                                <Check size={16} strokeWidth={4} />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-2 pt-2 border-t border-border/30">
                                <p className="text-[9px] font-medium text-muted-foreground/60 italic px-2">
                                    Changes global primary colors and gradients.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
