'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { socialLinks } from '@/lib/data';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Using Web3Forms for a functional, zero-config backend
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'f086e710-ee2c-46ed-a0c3-7a823d77f996', // User should replace this with their key from web3forms.com
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New Portfolio Message from ${formData.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('idle');
            alert('Something went wrong. Please try again or email me directly.');
        }
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden bg-background">
            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-stretch">

                    {/* Cinematic Invitation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="text-primary animate-pulse" size={24} />
                            <h3 className="text-primary font-black tracking-[0.4em] uppercase text-xs">Collaboration</h3>
                        </div>
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12">
                            Start the <br />
                            <span className="text-gradient">Dialogue</span>.
                        </h2>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium max-w-xl mb-16 leading-relaxed">
                            Seeking high-impact roles in Full Stack and Data Engineering.
                            Let’s architect the next generation of digital products.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-[2px] bg-primary/20" />
                                <a
                                    href={`mailto:${socialLinks.email}`}
                                    className="text-lg font-black uppercase tracking-[0.2em] hover:text-primary transition-all flex items-center gap-4 group"
                                >
                                    Transmission via Email
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Premium Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-[600px] shrink-0"
                    >
                        <div className="glass-card p-12 md:p-16 rounded-[4rem] shadow-[0_0_100px_rgba(var(--primary),0.1)] relative overflow-hidden border-border/40">
                            {/* Internal Mesh Effect */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -z-10" />

                            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <Input
                                        label="FullName"
                                        id="name"
                                        placeholder="Deepak K."
                                        value={formData.name}
                                        onChange={(val: string) => setFormData({ ...formData, name: val })}
                                    />
                                    <Input
                                        label="EmailAddress"
                                        id="email"
                                        type="email"
                                        placeholder="deepak@dev.com"
                                        value={formData.email}
                                        onChange={(val: string) => setFormData({ ...formData, email: val })}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-2">MessageDetails</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-secondary/30 border-2 border-border/40 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 rounded-3xl px-8 py-8 outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/20 resize-none"
                                        placeholder="Tell me about your project or vision..."
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status !== 'idle'}
                                    className="w-full py-6 bg-foreground text-background rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50 group overflow-hidden relative"
                                >
                                    <AnimatePresence mode="wait">
                                        {status === 'idle' && (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-4"
                                            >
                                                Initiate Transmission
                                                <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                            </motion.div>
                                        )}
                                        {status === 'sending' && (
                                            <motion.div
                                                key="sending"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-4"
                                            >
                                                <Loader2 size={18} className="animate-spin text-primary" />
                                                Synchronizing...
                                            </motion.div>
                                        )}
                                        {status === 'success' && (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-4 text-emerald-500"
                                            >
                                                Data Received
                                                <CheckCircle size={18} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Input({ label, id, placeholder, value, onChange, type = "text" }: any) {
    return (
        <div className="space-y-4">
            <label htmlFor={id} className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 ml-2">{label}</label>
            <input
                id={id}
                required
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-secondary/30 border-2 border-border/40 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 rounded-[2rem] px-8 py-6 outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/20"
                placeholder={placeholder}
            />
        </div>
    );
}
