"use client";
import { Select, Table, TableColumnsType } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Client {
    id: number;
    email: string;
    iin: string;
    status: "waiting" | "processing" | "finished";
}
const socket = io("https://wehack-ws-of5r5e4d7a-lm.a.run.app");

const statuses: Client["status"][] = ["waiting", "processing", "finished"];

export default function ClientsTable() {
    const [clients, setClients] = useState<Client[]>([]);

    const columns: TableColumnsType<Client> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "IIN",
            dataIndex: "iin",
            key: "iin",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, record) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) =>
                        handleStatusChange(record.id, record.iin, value)
                    }
                >
                    {statuses.map((status) => (
                        <Select.Option key={status} value={status}>
                            {status}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
    ];
    useEffect(() => {
        const fetchClients = async () => {
            const response = await axios.get<Client[]>(
                "https://queue-service-bvrrx45lva-uc.a.run.app/api/consultants/admin/clients"
            );
            setClients(response.data);
        };

        fetchClients();
    }, []);

    const handleStatusChange = async (
        clientId: number,
        iin: string,
        newStatus: Client["status"]
    ) => {
        socket.emit("send_notification", iin);
        console.log(iin);

        await axios.put(
            `https://queue-service-bvrrx45lva-uc.a.run.app/api/consultants/admin/clients/${clientId}`,
            {
                status: newStatus,
            }
        );
        // Optionally refresh the client list or locally update the status

        setClients(
            clients.map((client) =>
                client.id === clientId
                    ? { ...client, status: newStatus }
                    : client
            )
        );
    };

    return (
        <div>
            <Table columns={columns} dataSource={clients} rowKey="id" />
        </div>
    );
}
