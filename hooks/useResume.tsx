import { dummyResumeData } from "@/public/assets";
import { StoredResume } from "@/types/resume";
import { useEffect, useState } from "react";

export function UseResume(resumeId: string) {
    const [resume, setResume] = useState<StoredResume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!resumeId) return;

        const dummy = dummyResumeData.find((r) => r._id === resumeId);
        if (dummy) {
            setResume(dummy);
            setLoading(false);
            return
        }

        const stored = JSON.parse(localStorage.getItem("resumes") || "[]");
        const localResume = stored.find((r: StoredResume) => r._id === resumeId);

        setResume(localResume || null);
        setLoading(false);
    }, [resumeId]);

    return { resume, loading };
}