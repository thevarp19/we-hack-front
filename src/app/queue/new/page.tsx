"use client";
import { NewQueue } from "@/components/ui/NewQueue";
import { App } from "antd";
import { useRouter } from "next/navigation";

export default function newQueue() {
    const { message } = App.useApp();
    const router = useRouter();

    return <NewQueue />;
}
