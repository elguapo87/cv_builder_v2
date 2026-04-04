"use client"

import api from '@/lib/axios';
import { Lock, X } from 'lucide-react';
import { set } from 'mongoose';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        if (!token) {
            toast.error("Invalid or missing token");
            setLoading(false);
            return
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.post("/auth/resetPassword", { token, newPassword: formData.password });

            if (data.success) {
                toast.success(data.message);
                router.push("/login");
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Reset failed");

        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-white text-center mt-20">
                Invalid or expired reset link
            </div>
        );
    }

    return (
        <div className='flex items-center justify-center w-full h-screen bg-black/98'>
            <form
                onSubmit={handleSubmit}
                className="relative sm:w-87.5 text-center bg-gray-900 border border-gray-800 rounded-2xl py-12 px-8"
            >
                <X
                    onClick={() => router.push("/login")}
                    className='absolute top-2 right-2 size-6 text-stone-100 cursor-pointer 
                        hover:scale-105 transition-all duration-200'
                />

                <h1 className='text-xl text-stone-100'>Reset your password</h1>

                <div className='flex flex-col items-center justify-center gap-6.5 mt-5'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div
                            className="flex items-center w-full bg-gray-800 border border-gray-700
                                h-12 rounded-full overflow-hidden pl-6 gap-2"
                        >
                            <Lock size={16} className="text-gray-500" />
                            <input
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                type="password"
                                value={formData.password}
                                placeholder='Password'
                                className="w-full bg-transparent text-white placeholder-gray-400
                                    border-none outline-none"
                                required
                            />
                        </div>

                        <div
                            className="flex items-center w-full bg-gray-800 border border-gray-700
                                h-12 rounded-full overflow-hidden pl-6 gap-2"
                        >
                            <Lock size={16} className="text-gray-500" />
                            <input
                                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                value={formData.confirmPassword}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-transparent text-white placeholder-gray-400
                                    border-none outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className="w-full h-11 rounded-full text-gray-800 bg-[#71fe64] hover:bg-[#13a506]
                            hover:text-gray-300 transition"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
