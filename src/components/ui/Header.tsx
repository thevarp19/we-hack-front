"use client";
import { getConfirm } from "@/api/chat";
import { useAuthContext } from "@/context/AuthContext";
import { Spin } from "antd";
import clsx from "clsx";
import { ShieldSlash, ShieldTick } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "../shared/Logo";

export const Header = () => {
    const router = useRouter();
    const { userProfile, logout } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmEmail, setConfirmEmail] = useState<boolean>(false);
    useEffect(() => {
        const isEmailConfirmed = localStorage.getItem("isEmailConfirmed");
        setConfirmEmail(
            isEmailConfirmed ? JSON.parse(isEmailConfirmed) : false
        );
    }, []);
    const handleConfirmEmail = async () => {
        setIsLoading(true);
        try {
            const response = await getConfirm();
            router.push(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <div className="w-full h-full items-center flex justify-center">
                <Spin size="small" />
            </div>
        );
    }
    return (
        <header
            className={clsx(
                "flex items-center justify-between max-sm:h-16 h-24 px-5 sm:px-10",
                "border-b border-primary"
            )}
        >
            <div className="flex items-center justify-between gap-10">
                <Logo href="/en/home" />
                <Link
                    href="/en/home/chat"
                    className="text-2xl flex gap-4 text-yellow uppercase font-medium hover:text-gray cursor-pointer"
                >
                    Chat
                </Link>
                <Link
                    href="/en/home/edu"
                    className="text-2xl flex gap-4 text-yellow uppercase font-medium hover:text-gray cursor-pointer"
                >
                    Education
                </Link>
            </div>
            <div className="flex z-50 gap-5">
                <div>
                    <div>
                        <h2 className="font-medium sm:text-lg">{`${userProfile?.first_name} ${userProfile?.last_name}`}</h2>

                        <h2 className="flex items-center">
                            {confirmEmail ? (
                                <>
                                    <ShieldTick size="32" color="#00805f" />
                                    Email verified.
                                </>
                            ) : (
                                <>
                                    <ShieldSlash size="32" color="#FF0000" />
                                    Email not confirmed.
                                </>
                            )}
                        </h2>
                    </div>
                    <div>
                        <button
                            onClick={handleConfirmEmail}
                            className={`opacity-50 text-xs bg-yellow rounded-lg px-1 sm:line-height-lg ${
                                confirmEmail && "hidden"
                            }`}
                        >
                            Confirm email
                        </button>
                    </div>
                </div>
                <a
                    // href="/login"
                    onClick={logout}
                    className="bg-yellow h-fit text-black rounded-md py-3 px-5 w-fit sm:line-height-lg"
                >
                    Logout
                </a>
            </div>
        </header>
    );
};
