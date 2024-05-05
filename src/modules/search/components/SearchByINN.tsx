"use client";
import { useSocketContext } from "@/context/SocketContext";
import { Button, Form, Input } from "antd";
import axios from "axios";

import { FC } from "react";

interface SearchByINNProps {
    setBookings: (bookings: any) => void;
    setLoading: (bool: boolean) => void;
    loading: boolean;
}

export const SearchByINN: FC<SearchByINNProps> = ({
    setBookings,
    setLoading,
    loading,
}) => {
    const [form] = Form.useForm();
    const { setUserINN } = useSocketContext();
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            setUserINN(values.inn);
            const response = await axios.get(
                `https://queue-service-bvrrx45lva-uc.a.run.app/api/clients/${values.inn}/`
            );
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm w-full">
            <h2 className="text-2xl mb-4 text-center">Напишите свой ИНН</h2>
            <Form
                layout="vertical"
                onFinish={onFinish}
                className=""
                form={form}
            >
                <Form.Item
                    rules={[
                        {
                            max: 12,
                            min: 4,
                            message: "INN must be 12 digits",
                            required: true,
                        },
                    ]}
                    required
                    name="inn"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Найти запись
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
