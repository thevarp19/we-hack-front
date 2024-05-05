"use client";
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import {
    Button,
    Input,
    Modal,
    Popconfirm,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";

interface ServiceListProps {}
const columns: TableColumnsType<any> = [
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Примерная длительность",
        dataIndex: "duration",
        key: "duration",
    },
    {
        title: "Кабинеты",
        render: (_, record) => {
            return <Button icon={<HomeOutlined />}>Посмотреть</Button>;
        },
    },
];

export const ServiceList: FC<ServiceListProps> = ({}) => {
    return (
        <div>
            <Table columns={columns} />
        </div>
    );
};

export const ServiceRoomsModal: FC<{}> = ({}) => {
    const columns: TableColumnsType<any> = [
        {
            title: "Box ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Delete",
            render: (_, record) => <DeleteBoxCell />,
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Boxes
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <div className="space-x-4">
                    <Input />
                    <Button onClick={() => {}}>Add</Button>
                </div>
                <Table className="mt-4" columns={columns} pagination={false} />
            </Modal>
        </div>
    );
};

const DeleteBoxCell: FC<{}> = ({}) => {
    return (
        <Popconfirm
            title="Delete the box from store"
            description="Are you sure to delete this box?"
            onConfirm={async () => {}}
        >
            <Button danger icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    );
};
