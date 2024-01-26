import { fetchUserProfile } from "@/api/auth";
import { UserProfile } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserProfile = () => {
    const query = useQuery<UserProfile>({
        queryFn: fetchUserProfile,
        queryKey: ["user-profile"],
    });

    return query;
};
