"use client";
import { Loading } from "@/components/shared/Loading";
import { mySessionStorage } from "@/lib/browserStorage";
import jwtService, { JwtType } from "@/lib/jwt";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePasswordPage({ searchParams }: any) {
    const router = useRouter();
    const { message } = App.useApp();

    useEffect(() => {
        const oauthLanguage = mySessionStorage?.get("language") || "kz";
        const urlParams = new URLSearchParams(window.location.search);
        const jwtToken: JwtType = {
            access: urlParams.get("access") || "",
            refresh: urlParams.get("refresh") || "",
        };
        if (jwtToken) {
            jwtService.saveJwt(jwtToken);
            router.push(`/${oauthLanguage}/home/`);
        } else {
            message.error("Not authorized");
            router.push(`/${oauthLanguage}/auth`);
        }
    }, []);

    return <Loading isFullScreen />;
}
