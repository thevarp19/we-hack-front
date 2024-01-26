import { axiosAuthorized } from "@/lib/axios";
import { JwtDTO, LoginDTO, RegisterDTO, UserProfileDTO } from "@/types/api";
import { UserProfile } from "@/types/auth";

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const { data } = await axiosAuthorized.get<UserProfileDTO>(
        "/users/profile/cover/"
    );
    return data as UserProfile;
};

export const login = async (values: LoginDTO): Promise<JwtDTO> => {
    const { data } = await axiosAuthorized.post<JwtDTO>("/auth/login", values);
    return data;
};

export const register = async (values: RegisterDTO): Promise<void> => {
    await axiosAuthorized.post("/auth/login", values);
};
