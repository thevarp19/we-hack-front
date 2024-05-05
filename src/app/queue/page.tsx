"use client";
import { Home } from "@/components/shared/Home";
import { App } from "antd";
import { useRouter } from "next/navigation";

export default function Queue() {
    const { message } = App.useApp();
    const router = useRouter();

    return <Home />;
}
