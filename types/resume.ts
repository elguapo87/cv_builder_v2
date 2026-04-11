import { StaticImageData } from "next/image";

export interface PersonalInfo {
    full_name: string;
    image?: string | StaticImageData | File;
    email?: string;
    profession?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
};

export interface Experience {
    position: string;
    company: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
};

export interface Projects {
    name: string;
    type?: string;
    description?: string;
};

export interface Education {
    degree: string;
    field?: string;
    institution: string;
    gpa?: string;
    start_date?: string;
    graduation_date?: string;
};

export type Skill = string;


export interface ResumeData {
    personal_info?: PersonalInfo;
    professional_summary?: string;
    experience?: Experience[];
    projects: Projects[];
    education?: Education[];
    skills?: Skill[];
}

export interface StoredResume extends ResumeData {
    personal_info: PersonalInfo;

    _id: string;
    userId: string;
    title: string;
    public: boolean;
    template: string;
    accent_color: string;
    updatedAt: string;
    createdAt: string;
}

