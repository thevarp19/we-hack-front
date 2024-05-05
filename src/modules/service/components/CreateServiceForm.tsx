"use client";
import { Button, Form, Input } from "antd";
import { FC } from "react";

interface CreateServiceFormProps {}

export const CreateServiceForm: FC<CreateServiceFormProps> = ({}) => {
    const onFinish = () => {};
    return (
        <div>
            <Form layout="vertical" onFinish={onFinish} className="max-w-lg">
                <Form.Item
                    label="Называние услуги"
                    rules={[
                        { max: 12, min: 12, message: "INN must be 12 digits" },
                    ]}
                    required
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Примерная длительность приема"
                    rules={[
                        { max: 12, min: 12, message: "INN must be 12 digits" },
                    ]}
                    required
                    name="duration"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
