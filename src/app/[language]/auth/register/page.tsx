"use client";
import { FormikInput } from "@/components/form/FormikInput";
import { useLanguage } from "@/context/LanguageContext";
import { useRegister } from "@/hooks/auth/useRegister";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Steps } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const { formik, mutation } = useRegister();
    const { getHref } = useLanguage();

    return (
        <main className="flex flex-col h-screen justify-center gap-10 items-center px-5">
            <div className="w-full max-w-xs sm:max-w-sm">
                <Steps
                    responsive={false}
                    className="!mb-10"
                    current={1}
                    items={[
                        {
                            title: "Profile",
                            icon: <UserOutlined />,
                        },
                        {
                            title: "Account",
                            icon: <SolutionOutlined />,
                            status: current == 1 ? "process" : "wait",
                        },
                    ]}
                />
                <Form
                    onFinish={formik.submitForm}
                    className="flex flex-col items-center gap-2 w-full px-10"
                >
                    <div className={clsx({ hidden: current == 1 }, "w-full")}>
                        <FormikInput
                            name="username"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Username",
                                size: "large",
                            }}
                        />
                        <FormikInput
                            name="firstName"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "First name",
                                size: "large",
                            }}
                        />
                        <FormikInput
                            name="lastName"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Last name",
                                size: "large",
                            }}
                        />
                        <Form.Item className="w-full">
                            <Button
                                size={"large"}
                                onClick={next}
                                className={clsx("w-full")}
                            >
                                Next step
                            </Button>
                        </Form.Item>
                    </div>
                    <div className={clsx({ hidden: current == 0 }, "w-full")}>
                        <FormikInput
                            name="email"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Email",
                                size: "large",
                                type: "email",
                            }}
                        />
                        <FormikInput
                            name="password"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Password",
                                size: "large",
                                type: "password",
                            }}
                        />
                        <FormikInput
                            name="repeatPassword"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Repeat password",
                                size: "large",
                                type: "password",
                            }}
                        />
                        <Form.Item className="w-full">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size={"large"}
                                loading={mutation.isPending}
                                className={clsx("w-full")}
                            >
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item className="w-full">
                            <Button
                                size={"large"}
                                onClick={prev}
                                className={clsx("w-full")}
                            >
                                Previous
                            </Button>
                        </Form.Item>
                    </div>

                    <Link
                        href={getHref("/auth/login")}
                        className="!p-0 !text-primary w-full"
                    >
                        Already have an account? Log in here
                    </Link>
                </Form>
            </div>
        </main>
    );
}
