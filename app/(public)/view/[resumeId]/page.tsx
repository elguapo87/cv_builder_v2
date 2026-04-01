"use client"

import Loader from "@/components/Loader";
import ResumePreview from "@/components/ResumePreview";
import { UseResume } from "@/hooks/useResume"
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";


const View = () => {
    const { resumeId } = useParams() as { resumeId: string };

    const { resume, loading } = UseResume(resumeId);

    if (loading) {
        return <Loader />
    }

    if (!resume) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-center text-6xl text-slate-200 font-medium">
                    Resume not found
                </p>

                <Link
                    href="/"
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9
                        ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
                >
                    <ArrowLeftIcon className="mr-2 size-4" />
                    go to home
                </Link>
            </div>
        );

    }

    return (
        <div className="min-h-screen bg-black/98">
            <div className="max-w-3xl mx-auto py-10">
                <ResumePreview
                    data={resume}
                    template={resume.template}
                    accentColor={resume.accent_color}
                    classes="py-4 bg-white"
                />
            </div>
        </div>
    )
}

export default View
