"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const AntdProvider: FC<PropsWithChildren> = ({ children }) => (
    <AntdRegistry>
        <ConfigProvider theme={{ token: { colorPrimary: "#00805f" } }}>
            <App>{children}</App>
        </ConfigProvider>
    </AntdRegistry>
);
