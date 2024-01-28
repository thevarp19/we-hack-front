"use client";
import { getConfirm } from "@/api/chat";
import { useAuthContext } from "@/context/AuthContext";
import { Carousel } from "antd";
import { ShieldSlash, ShieldTick } from "iconsax-react";
import Image from "next/image";
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
        <div>
            <Carousel autoplay>
                <div
                    style={{ height: "50%" }}
                    className="relative flex items-center justify-center h-[calc(60vh+10px)]"
                >
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
                <div
                    style={{ height: "50%" }}
                    className="relative flex items-center justify-center h-[calc(60vh+10px)]"
                >
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
                <div
                    style={{ height: "50%" }}
                    className="relative flex items-center justify-center h-[calc(60vh+10px)]"
                >
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
                <div
                    style={{ height: "50%" }}
                    className="relative flex items-center justify-center h-[calc(60vh+10px)]"
                >
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
            <div></div>
            <div>
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
        </div>
    );
}
