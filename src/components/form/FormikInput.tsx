"use client";
import { getFormikHelpText } from "@/utils/form.util";
import { Form, FormItemProps, Input, InputProps } from "antd";
import { FormikProps } from "formik";
import { FC } from "react";

interface FormikInputProps {
    formik: FormikProps<any>;
    name: string;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
}

export const FormikInput: FC<FormikInputProps> = ({
    formik,
    name,
    formItemProps,
    inputProps,
}) => {
    return (
        <Form.Item help={getFormikHelpText(formik, name)} {...formItemProps}>
            <Input
                onChange={formik.handleChange}
                name={name}
                value={formik.values[name]}
                {...inputProps}
            />
        </Form.Item>
    );
};
