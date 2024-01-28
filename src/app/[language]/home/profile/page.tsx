"use client";

import { getConfirm } from "@/api/chat";
import MyForm from "@/components/form/MyForm";
import { ShieldSlash, ShieldTick } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
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
        <div className="w-full h-full flex flex-col items-center pt-5">
            <div className="w-1/2 h-full border-2 border-primary p-5 rounded-lg ">
                <h2 className="text-primary text-3xl pb-5 font-bold">
                    Подайте заявку на компенсацию Halyk Life
                </h2>
                <MyForm />
            </div>
            <div className="w-1/2 flex justify-center pt-5">
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
        </div>
    );
}
