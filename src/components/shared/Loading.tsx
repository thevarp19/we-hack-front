import { Spin } from "antd";
import clsx from "clsx";
import { FC } from "react";

interface LoadingProps {
    isFullScreen?: boolean;
}

export const Loading: FC<LoadingProps> = ({ isFullScreen }) => {
    return (
        <div
            className={clsx("flex items-center justify-center w-full h-full", {
                "w-screen h-screen": isFullScreen,
            })}
        >
            <Spin size="large" />
        </div>
    );
};
