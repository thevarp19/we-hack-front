"use client";
import { FormikInput } from "@/components/form/FormikInput";
import { useCreateCourse } from "@/hooks/edu/useCreateCourse";
import { getFormikHelpText } from "@/utils/form.util";
import {
    PaperClipOutlined,
    PictureOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select, Steps, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function CreateCoursePage() {
    const { formik, mutation } = useCreateCourse();
    const [current, setCurrent] = useState(0);
    const [skillValue, setSkillValue] = useState("");
    const [goalValue, setGoalValue] = useState("");
    const next = () => {
        if (formik.values.title == "" || formik.values.photoUrl == "") {
            formik.setFieldTouched("title");
            formik.setFieldTouched("photoUrl");
            return;
        }
        if (
            (formik.values.duringInHours == 0 ||
                formik.values.description == "") &&
            current == 1
        ) {
            formik.setFieldTouched("duringInHours");
            formik.setFieldTouched("description");
            return;
        }
        setCurrent((prev) => prev + 1);
    };

    const prev = () => {
        setCurrent((prev) => prev - 1);
    };

    return (
        <main className="flex flex-col h-screen justify-center gap-10 items-center px-5">
            <h1 className="uppercase text-2xl font-bold text-primary">
                Create course
            </h1>
            <div className="w-full max-w-xs sm:max-w-sm">
                <Steps
                    responsive={false}
                    className="!mb-10"
                    current={current - 1}
                    items={[
                        {
                            title: "Cover",
                            icon: <PictureOutlined />,
                            status:
                                current == 0 || current == 1 || current == 2
                                    ? "process"
                                    : "wait",
                        },
                        {
                            title: "Details",
                            icon: <SolutionOutlined />,
                            status:
                                current == 1 || current == 2
                                    ? "process"
                                    : "wait",
                        },
                        {
                            title: "Content",
                            icon: <PaperClipOutlined />,
                            status: current == 2 ? "process" : "wait",
                        },
                    ]}
                />
                <Form
                    onFinish={formik.submitForm}
                    className="flex flex-col items-center gap-2 w-full px-10"
                    layout="vertical"
                >
                    <div className={clsx({ hidden: current != 0 }, "w-full")}>
                        <FormikInput
                            name="title"
                            formik={formik}
                            formItemProps={{ className: clsx("w-full") }}
                            inputProps={{
                                placeholder: "Course title",
                                size: "large",
                            }}
                        />

                        <Button
                            size={"large"}
                            onClick={next}
                            className={clsx("w-full")}
                        >
                            Next step
                        </Button>
                    </div>
                    <div className={clsx({ hidden: current != 1 }, "w-full")}>
                        <FormikInput
                            name="duringInHours"
                            formik={formik}
                            formItemProps={{
                                className: clsx("w-full"),
                                label: "During in hours",
                            }}
                            inputProps={{
                                placeholder: "During in hours",
                                size: "large",
                                type: "number",
                            }}
                        />
                        <Form.Item className="w-full" label={"Course level"}>
                            <Select
                                size="large"
                                options={[
                                    { value: "beginner", label: "Beginner" },
                                    {
                                        value: "intermediate",
                                        label: "Intermediate",
                                    },
                                    { value: "advanced", label: "Advanced" },
                                ]}
                                value={formik.values.level}
                                onChange={(value) => {
                                    formik.setFieldValue("level", value);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            className="w-full"
                            label={"Course description"}
                            help={getFormikHelpText(formik, "description")}
                            validateStatus={
                                getFormikHelpText(formik, "description")
                                    ? "error"
                                    : ""
                            }
                        >
                            <TextArea
                                size="large"
                                rows={4}
                                value={formik.values.description}
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        "description",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Item>

                        <Button
                            size={"large"}
                            onClick={next}
                            className={clsx("w-full mb-5")}
                        >
                            Next step
                        </Button>

                        <Button
                            size={"large"}
                            onClick={prev}
                            className={clsx("w-full")}
                        >
                            Previous
                        </Button>
                    </div>
                    <div className={clsx({ hidden: current != 2 }, "w-full")}>
                        <Form.Item className="w-full" label={"Skills"}>
                            <div className="flex gap-2 py-3 flex-wrap">
                                {formik.values.skills.map((skill) => (
                                    <ConfigProvider
                                        key={uuid()}
                                        theme={{ token: { fontSize: 18 } }}
                                    >
                                        <Tag
                                            key={uuid()}
                                            closable
                                            onClose={(e) => {
                                                e.preventDefault();
                                                formik.setFieldValue(
                                                    "skills",
                                                    formik.values.skills.filter(
                                                        (s) => s != skill
                                                    )
                                                );
                                            }}
                                        >
                                            {skill}
                                        </Tag>
                                    </ConfigProvider>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    size="large"
                                    placeholder="Skill"
                                    value={skillValue}
                                    onChange={(e) => {
                                        setSkillValue(e.target?.value);
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        formik.setFieldValue("skills", [
                                            ...formik.values.skills,
                                            skillValue,
                                        ]);
                                        setSkillValue("");
                                    }}
                                    size={"large"}
                                    className={clsx("w-max")}
                                >
                                    Add
                                </Button>
                            </div>
                        </Form.Item>
                        <Form.Item className="w-full" label={"Course goals"}>
                            <div className="flex flex-col gap-2 py-3">
                                {formik.values.goals.map((goal) => (
                                    <ConfigProvider
                                        key={uuid()}
                                        theme={{ token: { fontSize: 18 } }}
                                    >
                                        <Tag
                                            key={uuid()}
                                            closable
                                            className="!flex justify-between"
                                            onClose={(e) => {
                                                e.preventDefault();
                                                formik.setFieldValue(
                                                    "goals",
                                                    formik.values.goals.filter(
                                                        (s) => s != goal
                                                    )
                                                );
                                            }}
                                        >
                                            {goal}
                                        </Tag>
                                    </ConfigProvider>
                                ))}
                            </div>
                            <div className="flex  gap-2">
                                <Input
                                    size="large"
                                    placeholder="Goal"
                                    value={goalValue}
                                    onChange={(e) => {
                                        setGoalValue(e.target?.value);
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        formik.setFieldValue("goals", [
                                            ...formik.values.goals,
                                            goalValue,
                                        ]);
                                        setGoalValue("");
                                    }}
                                    size={"large"}
                                    className={clsx("w-max")}
                                >
                                    Add
                                </Button>
                            </div>
                        </Form.Item>
                        <Form.Item className="w-full">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size={"large"}
                                loading={mutation.isPending}
                                className={clsx("w-full")}
                            >
                                Create
                            </Button>
                        </Form.Item>
                        <Button
                            size={"large"}
                            onClick={prev}
                            className={clsx("w-full")}
                        >
                            Previous
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
