import { AntdProvider } from "@/context/AntdContext";
import { QueryProvider } from "@/context/QueryContext";
import { roboto } from "@/styles/fonts";
import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bexenda",
    description: "Web app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(roboto.variable)}>
                <QueryProvider>
                    <AntdProvider>{children}</AntdProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
