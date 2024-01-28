import { CustomTextArea } from "@/components/ui/CustomTextArea";
import { Button } from "antd";
import { Send2 } from "iconsax-react";

export const MessageComposer = ({
    messageValue,
    setMessageValue,
    handleSendMessage,
    createMessage,
}: any) => {
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter" && messageValue.trim() !== "") {
            handleSendMessage(createMessage());
            e.preventDefault();
        }
    };
    return (
        <div className="px-4 sm:px-8 max-sm:py-3 py-5 flex gap-4 justify-between items-center">
            <CustomTextArea
                value={messageValue}
                onChange={(e) => {
                    setMessageValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
            />
            <div className="flex items-center">
                <Button
                    type="text"
                    onClick={() => {
                        if (messageValue.trim() !== "") {
                            handleSendMessage(createMessage());
                        }
                    }}
                >
                    <Send2 color="#00805f" />
                </Button>
            </div>
        </div>
    );
};
