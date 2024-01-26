"use client";
import { register } from "@/api/auth";
import { useLanguage } from "@/context/LanguageContext";
import { RegisterDTO } from "@/types/api";
import { RegisterData } from "@/types/auth";
import { emailSchema, requiredStringSchema } from "@/utils/form.util";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    username: requiredStringSchema(),
    firstName: requiredStringSchema(),
    lastName: requiredStringSchema(),
    email: emailSchema,
    password: requiredStringSchema().max(20).min(6),
    repeatPassword: requiredStringSchema().test(
        "password-match",
        "Passwords must match",
        function (value) {
            return value === this.parent.password;
        }
    ),
});

export const useRegister = () => {
    const router = useRouter();

    const { message } = App.useApp();
    const { getHref } = useLanguage();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess() {
            message.success("Success!");
            router.push(getHref("/auth/login"));
        },
        onError() {
            message.error("Error!");
        },
    });

    const handleSubmit = async () => {
        const registerDTO: RegisterDTO = {
            username: formik.values.username,
            first_name: formik.values.firstName,
            last_name: formik.values.lastName,
            email: formik.values.email,
            password: formik.values.password,
        };
        await mutation.mutateAsync(registerDTO);
    };

    const formik = useFormik<RegisterData>({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });
    return { formik, mutation };
};
