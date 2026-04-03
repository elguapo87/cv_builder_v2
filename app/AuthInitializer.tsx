"use client"

import { fetchUser, setInitialized, setToken } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setToken(token));
            dispatch(fetchUser());
        }

        dispatch(setInitialized());
    }, [dispatch]);

    return null;
}