"use client"

import { RootState } from "@/redux/store"
import { Zap } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"

const CallToAction = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div id="cte" className="bg-black/96 py-20">
            <div className="bg-stone-100  w-full max-w-5xl mx-auto px-16 shadow-md shadow-stone-100">
                <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 py-20 -mt-10 -mb-10 w-full">
                    <p className="text-xl font-medium max-w-sm">Build a Professional Resume That Help You Stand Out and Get Hired</p>
                    <Link
                        href={user ? "/dashboard" : "/login"}
                        className="flex items-center gap-2 rounded-md py-3 px-5 bg-[#14d624]
                             hover:bg-[#3f8308] transition text-white cursor-pointer"
                    >
                        <Zap size={20} />
                        <span>Get Started</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CallToAction