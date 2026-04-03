"use client"

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, initialized } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!initialized) return;

        if (token) {
            router.replace("/dashboard");
        }
    }, [token, initialized, router]);

    if (!initialized) return <Loader />
    
    if (!token) return <Loader />

    return <>{children}</>
}