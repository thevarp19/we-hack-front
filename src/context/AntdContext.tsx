"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const AntdProvider: FC<PropsWithChildren> = ({ children }) => (
    <AntdRegistry>
        <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
            {children}
        </ConfigProvider>
    </AntdRegistry>
);
