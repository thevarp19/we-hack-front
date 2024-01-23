"use client";
import { FormikInput } from "@/components/form/FormikInput";
import { useFormik } from "formik";

export default function Home() {
    return (
        <main>
            <FormikInput
                formik={useFormik({
                    initialValues: { name: "" },
                    onSubmit: () => {},
                })}
                name="name"
                inputProps={{ placeholder: "name" }}
            />
        </main>
    );
}
