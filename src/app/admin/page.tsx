"use client";

import { Button, Table, TableColumnsType } from "antd";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { CardResponse, useCardsQuery, useDeleteCardMutation } from "./queries";

const columns: TableColumnsType<CardResponse> = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "URL",
        dataIndex: "url",
        render: (_, record) => {
            return (
                <a
                    href={record.url}
                    target="_blank"
                    className="whitespace-nowrap truncate overflow-hidden w-96 block"
                >
                    {record.url}
                </a>
            );
        },
    },
    {
        title: "Delete",
        dataIndex: "url",
        render: (_, record) => {
            return <DeleteCard id={record.id} />;
        },
    },
];

function DeleteCard({ id }: { id: number }) {
    const { mutateAsync } = useDeleteCardMutation(id);
    return (
        <DeleteButton
            onConfirm={async () => {
                await mutateAsync();
            }}
        />
    );
}

export default function Page() {
    const { data, isPending } = useCardsQuery();
    return (
        <div>
            <Link href="/admin/create-card">
                <Button type="primary" className="mb-4">
                    Add a new card
                </Button>
            </Link>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={"id"}
                loading={isPending}
            />
        </div>
    );
}
