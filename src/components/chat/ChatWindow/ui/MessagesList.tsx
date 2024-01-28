import { MessageType } from "@/types/chat";
// import { groupTimestamps } from "@/utils/time.util";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { DefaultMessages } from "./DefaultMessages";
import { Message } from "./Message";
export const MessagesList = ({ messages }: { messages: MessageType[] }) => {
    const listButtomRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            //@ts-ignore
            listButtomRef?.current?.scrollIntoView({
                behavior: "smooth",
            });
        }, 0);
    }, [messages]);
    function createMarkup(text: string) {
        return { __html: text?.replace(/\n/g, "<br />") };
    }

    return (
        <section
            className={clsx(
                "border-b border-primary",
                "flex-grow px-5 sm:px-10",
                "flex flex-col overflow-y-scroll gap-6 py-6",
                "max-sm:max-h-[calc(100%-4rem-3rem)] max-h-[calc(100%-6rem-4rem)]",
                "md:px-5 lg:px-10"
            )}
        >
            {" "}
            {messages?.length < 99 && <DefaultMessages />}
            {messages?.map((message, index) => {
                return (
                    <Message
                        key={`${message}-${index}`}
                        isOwnMessage={message.role === "user"}
                    >
                        <h2
                            dangerouslySetInnerHTML={createMarkup(
                                message.content
                            )}
                        />
                    </Message>
                );
            })}
            <div ref={listButtomRef}></div>{" "}
        </section>
    );
};
