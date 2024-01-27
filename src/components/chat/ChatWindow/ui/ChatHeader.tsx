import { ChatHeaderProps } from "@/types/chat";
import clsx from "clsx";
import { ArrowLeft2 } from "iconsax-react";
import { FC } from "react";
export const ChatHeader: FC<ChatHeaderProps> = ({ children }) => {
    // const { openChatList } = useChatContext();

    return (
        <div
            className={clsx(
                "border-b border-primary",
                "max-sm:min-h-[4rem] min-h-[6rem] flex px-5 sm:px-10 items-center"
            )}
        >
            <div className="flex items-center gap-4">
                <ArrowLeft2
                    className="md:hidden cursor-pointer"
                    width={24}
                    height={24}
                />
                <div>{children}</div>
            </div>
        </div>
    );
};
