import { axiosAuthorized } from "@/lib/axios";

export const createCard = (card: any) => {
    return axiosAuthorized.post(`api/cards/`, card);
};

export const deleteCard = (cardId: any) => {
    return axiosAuthorized.delete(`api/cards/${cardId}/`);
};
