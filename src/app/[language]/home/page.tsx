"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "antd";

export default function HomePage() {
    const { userProfile, logout } = useAuthContext();
    return (
        <div>
            <h1>Hello</h1>
            <p>{userProfile?.first_name}</p>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
