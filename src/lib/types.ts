export interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
    featured: boolean;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    certificateUrl?: string;
    date: string;
}

export interface Certification {
    id: number;
    title: string;
    issuer: string;
    certificateUrl: string;
    date: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export interface PersonalInfo {
    name: string;
    role: string;
    location: string;
    profileImage: string;
}
