"use client";
import { verifyAuth } from "@/api/auth";
import jwtService from "@/lib/jwt";
import { UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";
import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLanguage } from "./LanguageContext";

interface AuthContext {
    userProfile?: UserProfile;
    logout: () => void;
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContext>({
    logout: () => {},
    isAuth: false,
});

export const useAuthContext = (): AuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return useContext(AuthContext);
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    // const { isError, data: userProfile, error } = useFetchUserProfile();
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    async function handleLogin() {
        const token = jwtService.getAccessToken();
        try {
            await verifyAuth(token);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
            // jwtService.removeJwt();
            // router.push(getHref("/auth"));
        }
    }
    const logout = () => {
        jwtService.removeJwt();
        window.location.href = getHref("/auth/login");
    };

    const { getHref } = useLanguage();

    useEffect(() => {
        handleLogin();
    }, []);
    return (
        <AuthContext.Provider value={{ isAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
