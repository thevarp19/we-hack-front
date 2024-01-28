"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Carousel } from "antd";
import Image from "next/image";

export default function HomePage() {
    const { userProfile, logout } = useAuthContext();
    const contentStyle: React.CSSProperties = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    return (
        <Carousel autoplay>
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
    );
}
