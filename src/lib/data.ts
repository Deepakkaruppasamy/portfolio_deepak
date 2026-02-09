import { Project, Achievement, Certification, Skill, PersonalInfo } from './types';

export const personalInfo: PersonalInfo = {
    name: 'Deepak K',
    role: 'Full Stack Developer | Data Analyst',
    location: 'Avinashi, Tiruppur',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak', // High-quality SVG placeholder
};

export const featuredProjects: Project[] = [
    {
        id: 1,
        name: 'ShashtiKarz',
        description: 'Vehicle Services Platform for automobile with AI-assisted customer support, smart notifications, loyalty system, and responsive UI.',
        techStack: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
        githubUrl: 'https://github.com/Deepakkaruppasamy/Shashti-Karz',
        liveUrl: 'https://shashti-karz.vercel.app',
        featured: true,
    },
    {
        id: 2,
        name: 'Zinema',
        description: 'Movie Ticket Booking Platform with MERN Stack, JWT authentication, Clerk, Stripe Payments, real-time seat booking, AI chatbot, and admin dashboard.',
        techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Stripe', 'JWT', 'Clerk'],
        githubUrl: 'https://github.com/Deepakkaruppasamy/Zinema',
        liveUrl: '#',
        featured: true,
    },
    {
        id: 3,
        name: 'Hostel Room Allocation System',
        description: 'MERN Stack application for student room selection, roommate requests, and comprehensive admin controls for hostel management.',
        techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
        githubUrl: 'https://github.com/Deepakkaruppasamy/hostel-allocation',
        liveUrl: '#',
        featured: true,
    },
    {
        id: 4,
        name: 'Quiz Application',
        description: 'Interactive quiz platform with timers, analytics dashboard, and certificate download functionality built with React and MongoDB.',
        techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
        githubUrl: 'https://github.com/Deepakkaruppasamy/quiz-app',
        liveUrl: '#',
        featured: true,
    },
];

export const achievements: Achievement[] = [
    {
        id: 1,
        title: 'First Prize – Data Analytics Hackathon',
        description: 'Anna University, 2025',
        certificateUrl: '/certificates/data-analytics-first-prize.pdf',
        date: '2025',
    },
    {
        id: 2,
        title: 'Third Prize – MINKSY\'24',
        description: 'AI Association, Kongu Engineering College, 2024',
        certificateUrl: '/certificates/minksy-third-prize.pdf',
        date: '2024',
    },
];

export const certifications: Certification[] = [
    {
        id: 1,
        title: 'Salesforce Certified Agentforce Specialist',
        issuer: 'Salesforce',
        certificateUrl: '/certificates/salesforce-agentforce.pdf',
        date: '2024',
    },
    {
        id: 2,
        title: 'MongoDB Certified Data Modeler',
        issuer: 'MongoDB',
        certificateUrl: '/certificates/mongodb-data-modeler.pdf',
        date: '2024',
    },
    {
        id: 3,
        title: 'MongoDB Certified Associate Developer',
        issuer: 'MongoDB',
        certificateUrl: '/certificates/mongodb-associate-developer.pdf',
        date: '2024',
    },
];

export const skills: Skill[] = [
    {
        category: 'Frontend',
        items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Angular', 'Bootstrap', 'Tailwind CSS'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
        category: 'Databases',
        items: ['MongoDB', 'MySQL', 'SQLite', 'Supabase'],
    },
    {
        category: 'Languages',
        items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
    },
    {
        category: 'Data & AI/ML',
        items: ['Data Analysis', 'Machine Learning Basics', 'Power BI'],
    },
    {
        category: 'Tools & Platforms',
        items: ['Git', 'GitHub', 'AWS', 'Salesforce', 'VS Code', 'Jupyter Notebook', 'Google Colab'],
    },
];

export const socialLinks = {
    email: 'deepakk.23it@kongu.edu',
    github: 'https://github.com/Deepakkaruppasamy',
    linkedin: 'https://www.linkedin.com/in/deepakkaruppasamy/',
    leetcode: 'https://leetcode.com/u/k_deepak/',
    salesforce: 'https://www.salesforce.com/trailblazer/vpg0vk6rafq3c6sg9q',
};

export const languages = ['English', 'Tamil', 'German'];
