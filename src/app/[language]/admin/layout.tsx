import { Logo } from "@/components/shared/Logo";
import { AuthProvider } from "@/context/AuthContext";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children?: ReactNode }) {
    return (
        <AuthProvider>
            <div className="flex justify-center w-screen h-screen">
                <div className="flex flex-col min-w-[90%] sm:min-w-[620px]">
                    <div className="py-5 px-5 border-b flex items-center  justify-between">
                        <Logo />
                        <Link
                            href="/"
                            className="text-yellow hover:text-yellow cursor-pointer"
                        >
                            Log out
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </AuthProvider>
    );
}
