"use client";
import { Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const statuses = ["waiting", "progressing", "finished"];

export default function ClientsTable() {
    const [clients, setClients] = useState([]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "IIN",
            dataIndex: "iin",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_: any, record: { status: any; id: any }) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record.id, value)}
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
            const response = await axios.get("/api/consultants/admin/clients");
            setClients(response.data);
        };

        fetchClients();
    }, []);

    const handleStatusChange = async (clientId: number, newStatus: string) => {
        await axios.put(`/api/consultants/admin/clients/${clientId}`, {
            status: newStatus,
        });
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
