"use client";
import { useAuthContext } from "@/context/AuthContext";

export default function HomePage() {
    const { userProfile } = useAuthContext();
    return (
        <div>
            <h1>Hello</h1>
            <p>{userProfile?.fistName}</p>
        </div>
    );
}
