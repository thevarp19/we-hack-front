import { getAnswer, sendMessage } from "@/api/chat";
import { useChatContext } from "@/context/ChatContext";
import { AnswerType, MessageType } from "@/types/chat";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useCreateMessage = () => {
    const [messageValue, setMessageValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { addMessage, setIsUpdated } = useChatContext();
    const queryClient = useQueryClient();
    const [runId, setRunId] = useState<string | null>(null);

    const createMessage = (): MessageType => {
        return {
            content: messageValue,
            role: "user",
            // time: Date.now(),
        };
    };

    const handleSendMessage = async (data: MessageType) => {
        setIsLoading(true);

        try {
            setMessageValue("");
            addMessage(data);
            const response = await sendMessage(data);
            setRunId(response.data.run_id);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (runId) {
            const checkStatusInterval = 3000;
            const checkStatus = () => {
                getAnswer(runId)
                    .then((response: AxiosResponse<AnswerType>) => {
                        const data = response.data;
                        if (data.status === "completed") {
                            queryClient.invalidateQueries({
                                queryKey: ["get_chat"],
                            });
                            addMessage(data.answer);
                            setIsLoading(false);
                            clearInterval(intervalId);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching status:", error);
                        clearInterval(intervalId);
                    });
            };

            intervalId = setInterval(checkStatus, checkStatusInterval);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [runId]);
    return {
        isLoading,
        handleSendMessage,
        messageValue,
        setMessageValue,
        createMessage,
    };
};
