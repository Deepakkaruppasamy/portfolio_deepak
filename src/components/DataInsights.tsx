'use client';

import { motion, useInView } from 'framer-motion';
import {
    BarChart3,
    Activity,
    Zap,
    Globe2,
    Database,
    ShieldCheck,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const stats = [
    { label: 'Lines of Code', value: 45000, suffix: '+', icon: Activity, color: 'text-blue-500' },
    { label: 'Projects Built', value: 12, suffix: '', icon: Zap, color: 'text-amber-500' },
    { label: 'Data Points Analyzed', value: 1.2, suffix: 'M+', icon: BarChart3, color: 'text-emerald-500' },
    { label: 'Deployment Uptime', value: 99.9, suffix: '%', icon: ShieldCheck, color: 'text-rose-500' },
];

export default function DataInsights() {
    return (
        <section className="section-padding relative overflow-hidden bg-secondary/5">
            <div className="container-custom relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-primary mb-6"
                    >
                        <Activity size={20} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">System Diagnostics</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                        Technical <span className="text-gradient">Performance</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl max-w-2xl font-medium">
                        A real-time snapshot of engineering output and data processing efficiency across my digital ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} />
                    ))}
                </div>

                {/* Cinematic Mini Graph Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 glass-card rounded-[3rem] border-primary/20 relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black tracking-tight mb-2">Algorithm Efficiency</h3>
                            <p className="text-muted-foreground text-sm font-medium">Processing latency across global edge locations.</p>
                        </div>
                        <div className="flex gap-4 items-end h-24">
                            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ delay: 1 + (i * 0.1), duration: 1, ease: "circOut" }}
                                    className="w-3 rounded-full bg-primary/20"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent -z-10" />
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
        </section>
    );
}

function StatCard({ stat, index }: { stat: any; index: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 glass-card rounded-3xl border-border/40 hover:border-primary/30 transition-all group flex flex-col gap-6"
        >
            <div className={`p-4 rounded-2xl bg-secondary w-fit group-hover:bg-primary/10 transition-colors`}>
                <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div>
                <div className="text-4xl font-black mb-1 flex items-baseline gap-1">
                    <span>{stat.value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}</span>
                    <span className="text-primary text-xl">{stat.suffix}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
            </div>
        </motion.div>
    );
}
