import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        redirect("/");
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-black/97">
                <Navbar />
                {children}
            </div>
        </AuthGuard>
    )


}