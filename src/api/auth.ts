import { axios, axiosAuthorized } from "@/lib/axios";
import { JwtDTO, LoginDTO, RegisterDTO, UserProfileDTO } from "@/types/api";
import { UserProfile } from "@/types/auth";

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const { data } = await axiosAuthorized.get<UserProfileDTO>("/api/profile/");
    const userProfile: UserProfile = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        is_email_confirmed: data.is_email_confirmed,
    };
    return userProfile;
};

export const login = async (values: LoginDTO): Promise<JwtDTO> => {
    const { data } = await axios.post<JwtDTO>("/api/login/", values);
    return data;
};

export const register = async (values: RegisterDTO): Promise<void> => {
    await axios.post("/api/register/", values);
};
