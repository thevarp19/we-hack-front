"use client";
import { Button, Form, Input } from "antd";

import { FC } from "react";

interface SearchByINNProps {}

export const SearchByINN: FC<SearchByINNProps> = ({}) => {
    const onFinish = () => {};
    return (
        <div className="flex justify-between">
            <Form layout="vertical" onFinish={onFinish} className="max-w-lg">
                <Form.Item
                    label="INN"
                    rules={[
                        { max: 12, min: 12, message: "INN must be 12 digits" },
                    ]}
                    required
                    name="inn"
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
