import { defaultMsg } from "@/api/chat";
import { Spin } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useCreateMessage } from "../hooks/useCreateMessage";

export const DefaultMessages: React.FC = () => {
    const [defaultMessages, setDefaultMessages] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { handleSendMessage, isLoading: mess } = useCreateMessage();
    useEffect(() => {
        const fetchDefaultMessages = async () => {
            setIsLoading(true);
            try {
                const response = await defaultMsg();
                setDefaultMessages(response.data);
            } catch (error) {
                console.error("Error fetching default messages:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDefaultMessages();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end justify-end h-full">
            {isLoading ? (
                <Spin size="large" />
            ) : (
                defaultMessages?.map((message: string, key: number) => (
                    <div
                        onClick={() => {
                            handleSendMessage({
                                content: message,
                                role: "user",
                            });
                        }}
                        key={key}
                        className={clsx(
                            "rounded-lg cursor-pointer bg-gray py-3 px-6 w-max text-[12px] text-black"
                        )}
                    >
                        {" "}
                        <h2 className="whitespace-pre-line" key={key}>
                            {message}
                        </h2>
                    </div>
                ))
            )}
        </div>
    );
};
