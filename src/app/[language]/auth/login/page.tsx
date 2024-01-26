"use client";
import {
    FormikInput,
    FormikPasswordInput,
} from "@/components/form/FormikInput";
import { Logo } from "@/components/shared/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useLogin } from "@/hooks/auth/useLogin";
import { Button, Form } from "antd";
import clsx from "clsx";
import Link from "next/link";

export default function LoginPage() {
    const { formik, mutation } = useLogin();
    const { getHref } = useLanguage();

    return (
        <main className="flex flex-col h-screen justify-center gap-10 items-center px-5">
            <Logo />
            <div className="w-full max-w-xs sm:max-w-sm">
                <Form
                    onFinish={formik.submitForm}
                    className="flex flex-col items-center gap-2 w-full px-10"
                >
                    <FormikInput
                        name="username"
                        formik={formik}
                        formItemProps={{ className: clsx("w-full") }}
                        inputProps={{
                            placeholder: "Username",
                            size: "large",
                        }}
                    />

                    <FormikPasswordInput
                        name="password"
                        formik={formik}
                        formItemProps={{ className: clsx("w-full") }}
                        inputProps={{
                            placeholder: "Password",
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
                            Log in
                        </Button>
                    </Form.Item>

                    <Link
                        href={getHref("/auth/register")}
                        className="!p-0 !text-primary w-full"
                    >
                        Don&apos;t have an account? Register here
                    </Link>
                </Form>
            </div>
        </main>
    );
}
