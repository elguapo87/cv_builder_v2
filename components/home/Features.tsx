"use client"

import { Zap } from "lucide-react";
import { useState } from "react";
import Title from "./Title";

const Features = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div id="features" className="flex flex-col items-center bg-black/99 py-10 scroll-mt-12">

            <div className="flex items-center gap-2 text-sm text-gray-800 bg-[#a6ff5c]  rounded-full px-4 py-2">
                <Zap size={18} />
                <span>Simple Process</span>
            </div>

            <Title
                title="Build your resume"
                description="An effortless process for creating professional resumes in minutes, powered by intelligent AI tools."
            />

            <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-[#a6ff5c] border border-transparent flex gap-4 rounded-xl transition-colors`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-stone-200 group-hover:text-gray-800">AI-Powered Resume Writing</h3>
                                <p className="text-sm text-stone-300 max-w-xs group-hover:text-gray-700">Generate compelling bullet points and professional summaries instantly using intelligent AI tailored to your industry.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-[#a6ff5c] flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-stone-200 group-hover:text-gray-800">Modern, ATS-Optimized Templates</h3>
                                <p className="text-sm text-stone-300 max-w-xs group-hover:text-gray-700">Choose from recruiter-approved templates designed to pass Applicant Tracking Systems and impress hiring managers.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-[#a6ff5c] flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-stone-200 group-hover:text-gray-800">Export & Share Instantly</h3>
                                <p className="text-sm text-stone-300 max-w-xs group-hover:text-gray-700">Download your resume as a high-quality PDF or share a secure public link with employers in seconds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
