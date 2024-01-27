import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

import { ReactNode } from "react";

export default function EduLayout({ children }: { children?: ReactNode }) {
    return (
        <div className="flex justify-center w-screen h-screen">
            <div className="flex flex-col min-w-[90%] sm:min-w-[620px]">
                <div className="py-5 px-5 border-b flex items-center  justify-between">
                    <Logo />
                    <Link
                        href="/en/home/edu"
                        className="text-yellow hover:text-yellow cursor-pointer"
                    >
                        Sign in as
                        <br className="sm:hidden" />
                        an employee
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
