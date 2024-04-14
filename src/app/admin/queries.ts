import { axiosAuthorized } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export interface CardResponse {
    id: number;
    name: string;
    url: string;
}

const getCards = () => {
    return axiosAuthorized.get<CardResponse[]>("/api/bank-card-type/");
};

export const useCardsQuery = () => {
    return useQuery({
        queryKey: ["cards"],
        queryFn: async () => {
            const { data } = await getCards();
            return data;
        },
    });
};

const deleteCard = (id: number) => {
    return axiosAuthorized.delete(`/api/bank-card-type/${id}/`);
};

export const useDeleteCardMutation = (id: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await deleteCard(id);
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["cards"] });
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};

export interface CreateCardRequest {
    name: string;
    url: string;
    bank: number;
}

const createCard = (data: CreateCardRequest) => {
    return axiosAuthorized.post(`/api/bank-card-type/`, data);
};

export const useCreateCardMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, void, CreateCardRequest>({
        mutationFn: async (values) => {
            await createCard(values);
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["cards"] });
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};

interface BankResponse {
    id: number;
    name: string;
}

const getBanks = () => {
    return axiosAuthorized.get<BankResponse[]>(`/api/bank/`);
};

export const useBankCards = () => {
    return useQuery({
        queryKey: ["banks"],
        queryFn: async () => {
            const { data } = await getBanks();
            return data;
        },
    });
};
