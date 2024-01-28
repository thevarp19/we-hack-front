"use client";
import { Logo } from "@/components/shared/Logo";
import { useAuthContext } from "@/context/AuthContext";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    RobotOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { ReactNode } from "react";

export default function EduLayout({ children }: { children?: ReactNode }) {
    const { logout } = useAuthContext();
    return (
        <div className="flex justify-center w-screen h-screen fixed top-0 left-0 z-[80] bg-white">
            <div className="flex flex-col min-w-[90%] sm:min-w-[620px]">
                <div className="py-5 px-5 border-b flex items-center  justify-between">
                    <Logo />
                    <Link
                        href="/en/auth/login"
                        className="text-yellow hover:text-yellow cursor-pointer"
                    >
                        Sign in as
                        <br className="sm:hidden" /> an employee
                    </Link>
                </div>
                <div className="grow h-max overflow-y-scroll bx-hidden-scroll sm:w-[660px]">
                    {children}
                </div>
                <div className="min-h-[90px]"></div>
                <div className=" bg-white flex items-center  justify-center fixed left-0 bottom-0 w-screen">
                    <div className="py-5 px-5 flex items-center justify-between w-full sm:w-[660px] border-t text-base">
                        <Link
                            href="/en/home/edu"
                            className="flex flex-col items-center gap-1 text-[#000] hover:text-primary cursor-pointer"
                        >
                            <HomeOutlined />
                            Courses
                        </Link>
                        <Link
                            href="#"
                            className="flex flex-col items-center gap-1 text-[#000] hover:text-primary cursor-pointer"
                        >
                            <ProfileOutlined />
                            Profile
                        </Link>
                        <Link
                            href="/en/home/chat"
                            className="flex flex-col items-center gap-1 text-[#000] hover:text-primary cursor-pointer"
                        >
                            <RobotOutlined />
                            Assistant
                        </Link>
                        <Link
                            href="/en/admin/"
                            className="flex flex-col items-center gap-1 text-[#000] hover:text-primary cursor-pointer"
                        >
                            <SettingOutlined />
                            Admin
                        </Link>
                        <Link
                            href="#"
                            onClick={logout}
                            className="flex flex-col items-center gap-1 text-[#000] hover:text-primary cursor-pointer max-sm:hidden"
                        >
                            <LogoutOutlined />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
