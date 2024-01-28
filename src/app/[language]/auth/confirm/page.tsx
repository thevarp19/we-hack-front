"use client";
import { confirmEmail } from "@/api/chat";
import { useLanguage } from "@/context/LanguageContext";
import { Spin, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { getHref } = useLanguage();
    const handleConfirmEmail = async (uid: string, token: string) => {
        setIsLoading(true);
        try {
            const response = await confirmEmail(uid, token);
            router.push(getHref("/home"));
            messageApi.success(response.data.message);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const token = searchParams.get("token");
        const uid = searchParams.get("uid");
        if (uid && token) {
            handleConfirmEmail(uid, token);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full items-center flex justify-center">
                <Spin size="large" />
            </div>
        );
    }
    return <>{contextHolder}</>;
}
