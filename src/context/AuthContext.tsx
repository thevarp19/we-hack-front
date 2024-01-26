"use client";
import { Loading } from "@/components/shared/Loading";
import { useFetchUserProfile } from "@/hooks/query/auth";
import { UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContext {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    userProfile?: UserProfile;
}

export const AuthContext = createContext<AuthContext>({
    isAuth: false,
    setIsAuth: () => {},
});

export const useAuthContext = (): AuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return useContext(AuthContext);
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const { isPending, isError, data: userProfile } = useFetchUserProfile();

    useEffect(() => {
        if (isError) {
            router.push("/auth");
        }
    }, [isError]);

    if (isPending) {
        return <Loading isFullScreen />;
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, userProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
