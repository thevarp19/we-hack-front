"use client";
import { App } from "antd";
import { useRouter } from "next/navigation";

export default function DatePage() {
    const { message } = App.useApp();
    const router = useRouter();

    return <div></div>;
}
