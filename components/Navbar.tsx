"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const user = { name: "John Doe" };

    const router = useRouter();

    const logoutUser = async () => {
        router.push("/");
    };

    return (
        <div className='shadow md:shadow-md shadow-stone-100 bg-black/97'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4
                py-3.5 text-slate-800 transition-all'
            >
                <Link href="/">
                    <Image
                        src="/cvflow_logo.png"
                        alt="Logo"
                        width={200}
                        height={200}
                        className="h-6 md:h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-4 text-sm">
                    <p className="text-stone-100 max-sm:hidden">Hi, {user.name}</p>
                    <button
                        onClick={logoutUser}
                        className="bg-white hover:bg-stone-50 hover:text-black border border-gray-300 
                        px-7 py-1.5 rounded-full active:scale-95 transition-all duration-200 cursor-pointer" 
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
