"use client";
import { Button, Form, Input } from "antd";
import { FC } from "react";
import { io } from "socket.io-client";

interface CreateServiceFormProps {}
const socket = io("https://wehack-ws-of5r5e4d7a-lm.a.run.app");
const CreateServiceForm: FC<CreateServiceFormProps> = ({}) => {
    const onFinish = (values: any) => {
        console.log(values.inn);

        socket.emit("send_notification", values.inn);
    };
    return (
        <div>
            <Form layout="vertical" onFinish={onFinish} className="max-w-lg">
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
                    <Button type="primary" htmlType="submit">
                        принять
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default function Page({}) {
    return (
        <div>
            <CreateServiceForm />
        </div>
    );
}
