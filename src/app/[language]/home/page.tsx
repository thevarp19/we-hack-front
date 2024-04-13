"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col">
            <div className=" bg-white flex items-center  justify-center fixed left-0 bottom-0 w-screen"></div>
        </div>
    );
}
