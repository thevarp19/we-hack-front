import { useLogin } from "@/hooks/auth/useLogin";
import { Button, Form } from "antd";
import clsx from "clsx";
import React from "react";
import * as Yup from "yup";
import { FormikInput } from "./FormikInput";

// Define the type for your form fields
interface FormValues {
    id: number;
    statement: string;
    iin: string;
    policy_number: string;
    medical_documents: string;
    status: string;
}

// Validation Schema
const ValidationSchema = Yup.object().shape({
    statement: Yup.string().required("Required"),
    iin: Yup.string().required("Required"),
    policy_number: Yup.string().required("Required"),
    medical_documents: Yup.string().url("Invalid URL").required("Required"),
    status: Yup.string().required("Required"),
});

const MyForm: React.FC = () => {
    const { formik, mutation } = useLogin();
    const initialValues: FormValues = {
        id: 1,
        statement: "",
        iin: "",
        policy_number: "",
        medical_documents: "",
        status: "",
    };

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <Form onFinish={formik.submitForm}>
            <FormikInput
                name="statement"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Statement",
                    size: "large",
                }}
            />
            <FormikInput
                name="iin"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "IIN",
                    size: "large",
                }}
            />

            <FormikInput
                name="policy_number"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Policy Number",
                    size: "large",
                }}
            />
            <FormikInput
                name="medical_documents"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Medical Documents URL",
                    size: "large",
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyForm;
