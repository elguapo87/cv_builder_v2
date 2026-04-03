"use client"

import { logout } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

    const logoutUser = async () => {
        dispatch(logout());
    };

    console.log(user);
    

    return (
        <div className='shadow md:shadow-md shadow-[#A6FF5D] bg-black/97'>
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
                    <p className="text-stone-100 max-sm:hidden">
                        {user ? `Hi ${user.name}` : ""}
                    </p>
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
