'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AccentColor = {
    name: string;
    h: number;
    s: number;
    l: number;
};

export const accents: AccentColor[] = [
    { name: 'Vercel Blue', h: 212, s: 100, l: 48 },
    { name: 'Stripe Purple', h: 262, s: 83, l: 58 },
    { name: 'Apple Rose', h: 345, s: 83, l: 60 },
    { name: 'Emerald', h: 160, s: 84, l: 39 },
    { name: 'Orange', h: 24, s: 95, l: 53 },
    { name: 'Gold', h: 45, s: 93, l: 47 },
];

type AccentContextType = {
    currentAccent: AccentColor;
    setAccent: (accent: AccentColor) => void;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export function AccentProvider({ children }: { children: React.ReactNode }) {
    const [currentAccent, setCurrentAccent] = useState<AccentColor>(accents[1]); // Default Stripe Purple

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--p-h', currentAccent.h.toString());
        root.style.setProperty('--p-s', `${currentAccent.s}%`);
        root.style.setProperty('--p-l', `${currentAccent.l}%`);
    }, [currentAccent]);

    return (
        <AccentContext.Provider value={{ currentAccent, setAccent: setCurrentAccent }}>
            {children}
        </AccentContext.Provider>
    );
}

export function useAccent() {
    const context = useContext(AccentContext);
    if (!context) throw new Error('useAccent must be used within AccentProvider');
    return context;
}
