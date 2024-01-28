import { ChatType } from "@/types/chat";
import Image from "next/image";
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
                <div className="flex gap-3">
                    <Image
                        src={"/images/assistant.png"}
                        alt=" item"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                        width={70}
                        height={70}
                        loading="lazy"
                    />
                    <div className="flex flex-col justify-center">
                        <h2 className="text-lg font-medium">{title}</h2>
                        <div className="opacity-50">Online</div>
                    </div>
                </div>
            </ChatHeader>
            <MessagesList messages={messages} {...createChat} />

            <MessageComposer {...createChat} />
        </main>
    );
};
