'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGE = [
    "Deepak Terminal v1.0.0",
    "Type 'help' to see available commands.",
    ""
];

export default function DevTerminal() {
    const [history, setHistory] = useState<string[]>(INITIAL_MESSAGE);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        let response = "";

        switch (cmd) {
            case "help":
                response = "Available commands: about, skills, contact, clear, whoami, ls";
                break;
            case "about":
                response = "A passionate Full Stack Developer & Data Analyst focused on engineering high-performance digital products.";
                break;
            case "skills":
                response = "Next.js, React, Node.js, MongoDB, TypeScript, Python, Data Analytics, Cloud Architecture.";
                break;
            case "contact":
                response = "Transmission active at: deepakk.23it@kongu.edu";
                break;
            case "whoami":
                response = "Deepak K. - Creative Developer & Problem Solver.";
            case "ls":
                response = "about/  skills/  projects/  experience/  contact/";
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            default:
                response = `Command not found: ${cmd}. Type 'help' for assistance.`;
        }

        setHistory(prev => [...prev, `> ${input}`, response, ""]);
        setInput("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden border-border/40 shadow-2xl"
        >
            {/* Terminal Header */}
            <div className="bg-secondary/50 px-6 py-3 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <TerminalIcon size={16} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="h-64 p-8 overflow-y-auto font-mono text-sm space-y-2 bg-black/40 backdrop-blur-3xl custom-scrollbar"
            >
                <AnimatePresence mode="popLayout">
                    {history.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${line.startsWith('>') ? 'text-primary' : 'text-foreground/80'}`}
                        >
                            {line}
                        </motion.div>
                    ))}
                </AnimatePresence>

                <form onSubmit={handleCommand} className="flex items-center gap-3">
                    <span className="text-primary font-bold">❯</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-foreground"
                        autoFocus
                        spellCheck={false}
                    />
                </form>
            </div>
        </motion.div>
    );
}
