"use client";
import clsx from "clsx";
// import { Header } from "@/modules/Layout/components/Header/component";
// import { useChatListRenderStore } from "@/modules/Chat/store/useChatListRender";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
// import { getUser } from "@/modules/Auth/api";
// import { useAuthStore } from "@/modules/Auth/store/useAuth";
import { useAuthContext } from "@/context/AuthContext";
// import { User } from "@/lib/types/user";
export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userProfile, logout } = useAuthContext();
    const router = useRouter();

    // const query = useQuery({
    //     queryKey: ["authorize"],
    //     queryFn: getUser,
    //     onError: (error) => {
    //         router.push("/login");
    //     },
    //     onSuccess: (response: AxiosResponse<User>) => {
    //         setIsAuthorized(true);
    //         const { data } = response;
    //         setUser(data);
    //     },
    //     retry: false,
    //     enabled: !isAuthorized,
    // });
    if (!userProfile) {
        return (
            <div className="w-screen h-full fixed items-center flex justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className={clsx("h-full w-screen fixed top-0 left-0 ")}>
            <div className="h-[96px] relative -z-10"></div>
            {/* <Header /> */}
            <div className="flex max-sm:h-[calc(100%-4rem)] h-[calc(100%-6rem)]">
                <div className={clsx("overflow-y-auto w-full")}>{children}</div>
            </div>
        </div>
    );
}
