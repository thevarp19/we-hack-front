import { ChatType } from "@/types/chat";
import { FC } from "react";
import { useCreateMessage } from "./hooks/useCreateMessage";
import { ChatHeader } from "./ui/ChatHeader";
import { MessageComposer } from "./ui/MessageComposer";
import { MessagesList } from "./ui/MessagesList";

export const ChatWindow: FC<ChatType> = ({ title, messages }) => {
    const createChat = useCreateMessage();

    return (
        <main className="w-full h-full flex flex-col justify-between">
            <ChatHeader>
                <h2 className="text-lg font-medium">{title}</h2>
                <p className="opacity-50">
                    {createChat.isLoading ? <span>Typing...</span> : "Online"}
                </p>
            </ChatHeader>
            <MessagesList messages={messages} />
            <MessageComposer {...createChat} />
        </main>
    );
};
