"use client";
import { App } from "antd";
import {
    FC,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import io from "socket.io-client";
interface SocketProviderProps {
    children: React.ReactNode;
}

const socket = io("https://wehack-ws-of5r5e4d7a-lm.a.run.app");

interface SocketContext {
    userINN: string;
    setUserINN: (inn: string) => void;
}

export const SocketContext = createContext<SocketContext>({
    userINN: "",
    setUserINN: () => {},
});

export const useSocketContext = (): SocketContext => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error(
            "useSocketContext must be used within a SocketProvider"
        );
    }
    return useContext(SocketContext);
};

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
    const [userINN, setUserINN] = useState("");
    const { notification } = App.useApp();
    const currentINN = useRef(userINN);
    useEffect(() => {
        console.log("userINN", userINN);

        socket.emit("joinRoom", userINN);

        socket.on("notification", (message: any) => {
            console.log("userINN", userINN, message);
            notification.info({
                message: "Notification",
                description: message,
            });
        });

        return () => {
            socket.emit("leaveRoom", userINN);
            socket.off("notification");
        };
    }, [userINN]);
    return (
        <SocketContext.Provider value={{ userINN, setUserINN }}>
            {children}
        </SocketContext.Provider>
    );
};
