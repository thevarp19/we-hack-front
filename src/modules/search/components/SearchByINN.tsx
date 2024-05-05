"use client";
import { Button, Form, Input } from "antd";

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
    const onFinish = (values: any) => {
        setLoading(true);
        try {
            setBookings([]);
        } catch (error) {
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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
