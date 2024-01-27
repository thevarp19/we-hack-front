"use client";
import { getChat } from "@/api/chat";
import { ChatWindow } from "@/components/chat/ChatWindow/component";
import { useChatContext } from "@/context/ChatContext";
import { MessageType } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect } from "react";

export default function VirtualChatPage() {
    // const router = useRouter();
    const { messages, setMessages } = useChatContext();

    const { isPending, isError, isSuccess, data } = useQuery({
        queryKey: [`get_chat`],
        queryFn: () => getChat(),
        retry: false,
    });
    useEffect(() => {
        setMessages(data?.data as MessageType[]);
    }, [isSuccess]);

    if (isPending || isError) {
        return (
            <div className="w-full h-full items-center flex justify-center">
                <Spin size="large" />
            </div>
        );
    }
    return <ChatWindow messages={messages} title="Virtual Assistant" />;
}
