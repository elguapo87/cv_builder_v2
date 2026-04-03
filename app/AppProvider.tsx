"use client"

import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthInitializer from "./AuthInitializer";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            <Toaster />
            {children}
        </Provider>
    )
}