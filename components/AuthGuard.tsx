"use client"

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token, loading, initialized } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!initialized) return;

        if (!token) {
            router.replace("/");
        }
    }, [token, router, initialized]);

    if (!initialized || loading) return <Loader />

    if (!token) return null;

    return <>{children}</>
}