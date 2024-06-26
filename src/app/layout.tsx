import { AntdProvider } from "@/context/AntdContext";
import { QueryProvider } from "@/context/QueryContext";
import { SocketProvider } from "@/context/SocketContext";
import { roboto } from "@/styles/fonts";
import "@/styles/globals.css";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Queue app",
    description: "Web app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full bg-gray-100">
            <body className={clsx(roboto.variable, "h-full")}>
                <QueryProvider>
                    <AntdProvider>
                        <SocketProvider>
                            <Header className="flex justify-between items-center p-0 ">
                                <Link href="/">
                                    <Avatar
                                        size="large"
                                        icon={<UserOutlined color="black" />}
                                    />
                                </Link>
                                {/* <h2 className="text-white">John Smit</h2> */}
                                <BellOutlined
                                    color="white"
                                    className="text-white bg-white rounded-full p-1 text-2xl"
                                />
                            </Header>
                            {children}

                            <Footer style={{ textAlign: "center" }}>
                                Created by Low Effort Team
                            </Footer>
                        </SocketProvider>
                    </AntdProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
