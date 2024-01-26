"use client";
import { Loading } from "@/components/shared/Loading";
import { useFetchUserProfile } from "@/hooks/query/auth";
import jwtService from "@/lib/jwt";
import { UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";
import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
} from "react";
import { useLanguage } from "./LanguageContext";

interface AuthContext {
    userProfile?: UserProfile;
    logout: () => void;
}

export const AuthContext = createContext<AuthContext>({ logout: () => {} });

export const useAuthContext = (): AuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return useContext(AuthContext);
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { isError, data: userProfile, error } = useFetchUserProfile();

    const logout = () => {
        jwtService.removeJwt();
        window.location.href = getHref("/auth/login");
    };

    const { getHref } = useLanguage();

    useEffect(() => {
        if (isError) {
            router.push(getHref("/auth/login"));
        }
    }, [isError]);

    if (!userProfile?.username) {
        return <Loading isFullScreen />;
    }

    return (
        <AuthContext.Provider value={{ userProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
