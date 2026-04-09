"use client"

import Loader from "@/components/Loader";
import ResumePreview from "@/components/ResumePreview";
import { getResumeById } from "@/redux/slices/resumeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const View = () => {
    const { resumeId } = useParams() as { resumeId: string };

    const currentResume = useSelector((state: RootState) => state.resume.currentResume);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoading(true);
                await dispatch(getResumeById(resumeId)).unwrap();

            } catch (error) {
                const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
                console.error(errMessage);

            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [resumeId, dispatch]);

    if (loading) return <Loader />;

    if (!currentResume) {
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
            <div className="max-w-3xl mx-auto py-10 max-sm:px-2">

                <Link
                    href="/"
                    className="flex items-center gap-0.75 mb-2 border border-stone-100 w-fit py-0.5 px-1 rounded-md
                      text-stone-100 hover:bg-stone-100 hover:text-gray-800 transition-all duration-200"
                >
                    <ArrowLeftIcon className="size-4.5" />
                    <p className="text-sm">Go back</p>
                </Link>


                <ResumePreview
                    data={currentResume}
                    template={currentResume.template}
                    accentColor={currentResume.accent_color}
                    classes="py-4 bg-white"
                />
            </div>
        </div>
    )
}

export default View
