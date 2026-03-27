import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default function AuthLayout({children}: {children: React.ReactNode}) {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-black/97">
            <Navbar />
            {children}
        </div>
    )

    
}