import { axiosAuthorized } from "@/lib/axios";
import { MessageType } from "@/types/chat";

export const getChat = () => {
    return axiosAuthorized.get(`api/chat/`);
};

export const sendMessage = (message: MessageType) => {
    return axiosAuthorized.post(`api/chat/`, message);
};
export const getAnswer = (run_id: string) => {
    return axiosAuthorized.get(`api/chat/answer/${run_id}`);
};

// export const createChat = (data: object) => {
//     return axiosAuthorized.post(`api/chat/`, data);
// };
