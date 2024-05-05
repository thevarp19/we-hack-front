"use client";
import { FC } from "react";

interface SearchResultsProps {}

export const SearchResults: FC<SearchResultsProps> = ({}) => {
    return (
        <div>
            <h1>Тема записи: {}</h1>
            <h2>Впереди {} клиентов</h2>
            <h3>Ожидаемое время приема {}</h3>
        </div>
    );
};
