import clsx from "clsx";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface MessageComponentProps {
    isOwnMessage?: boolean;
    children: ReactNode;
}

export const Message: FC<MessageComponentProps> = ({
    isOwnMessage,
    children,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "w-max max-w-[min(90%,24rem)] max-sm:max-w-[min(80vw,20rem)]",
                { "self-end": isOwnMessage }
            )}
        >
            <div
                className={clsx(
                    "rounded-2xl py-3 px-6 w-max max-w-[min(90%,40rem)] max-sm:max-w-[min(80vw,20rem)]",
                    `${isOwnMessage ? "bg-yellow text-black" : "bg-gray"}`
                )}
            >
                {children}
            </div>
        </motion.div>
    );
};
