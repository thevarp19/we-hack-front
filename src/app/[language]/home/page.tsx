"use client";
import { getConfirm } from "@/api/chat";
import { useAuthContext } from "@/context/AuthContext";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    RobotOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const { userProfile, logout } = useAuthContext();
    const router = useRouter();
    const contentStyle: React.CSSProperties = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };
    const [confirmEmail, setConfirmEmail] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    return (
        <div className="flex flex-col">
            <Carousel autoplay>
                <div className="relative flex items-center justify-center h-[calc(100vh-96px-85px)] max-sm:h-[calc(100vh-64px-85px)] grow">
                    <div className="absolute inset-0">
                        <Image
                            src="https://www.halyklife.kz/storage/app/uploads/public/60e/024/b87/60e024b879f77267188774.jpg"
                            alt="carousel item"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            fill
                            unoptimized
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="relative flex items-center justify-center h-[calc(100vh-96px-85px)] max-sm:h-[calc(100vh-64px-85px)] grow">
                    <div className="absolute inset-0">
                        <Image
                            src="https://www.halyklife.kz/storage/app/uploads/public/609/b8e/0bb/609b8e0bba376054512726.jpeg"
                            alt="carousel item"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            fill
                            unoptimized
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="relative flex items-center justify-center h-[calc(100vh-96px-85px)] max-sm:h-[calc(100vh-64px-85px)] grow">
                    <div className="absolute inset-0">
                        <Image
                            src="https://www.halyklife.kz/storage/app/uploads/public/60b/09b/41a/60b09b41aa78e548559117.jpeg"
                            alt="carousel item"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            fill
                            unoptimized
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="relative flex items-center justify-center h-[calc(100vh-96px-85px)] max-sm:h-[calc(100vh-64px-85px)] grow">
                    <div className="absolute inset-0">
                        <Image
                            src="https://www.halyklife.kz/storage/app/uploads/public/609/0be/f7a/6090bef7a1fa5727286916.jpeg"
                            alt="carousel item"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            fill
                            unoptimized
                            loading="lazy"
                        />
                    </div>
                </div>
            </Carousel>
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
                        href="/en/home/profile"
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
    );
}
