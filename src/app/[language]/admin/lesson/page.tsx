"use client";
import { FormikInput } from "@/components/form/FormikInput";
import { MultiplePhotoUpload } from "@/components/photo/MultiplePhotoUpload";
import { useCreateLesson } from "@/hooks/edu/useCreateLesson";
import { LessonType } from "@/types/edu";
import { PaperClipOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Form, Steps, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";
import { FormikProps } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function CreateLessonPage() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId") || "";
    const { formik, mutation } = useCreateLesson(courseId);
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (formik.values.title == "") {
            formik.setFieldTouched("title");
            return;
        }
        setCurrent((prev) => prev + 1);
    };

    const prev = () => {
        setCurrent((prev) => prev - 1);
    };

    return (
        <main className="flex flex-col h-screen py-14 gap-10 items-center px-5 overflow-y-scroll bx-hidden-scroll">
            <h1 className="uppercase text-2xl font-bold text-primary">
                Create lesson
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
                                current == 0 || current == 1
                                    ? "process"
                                    : "wait",
                        },
                        {
                            title: "Content",
                            icon: <PaperClipOutlined />,
                            status: current == 1 ? "process" : "wait",
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
                        <div className="overflow-y-scroll hidden-scroll max-h-[500px] p-4 border border-primary rounded-md bx-hidden-scroll mb-5">
                            {formik.values.lessonContents?.map(
                                (content, index) => {
                                    return (
                                        <LessonContentInput
                                            key={index}
                                            index={index}
                                            formik={formik}
                                        />
                                    );
                                }
                            )}
                        </div>
                        <Button
                            size={"large"}
                            onClick={() => {
                                if (
                                    Array.isArray(formik.values.lessonContents)
                                ) {
                                    formik.setFieldValue("lessonContents", [
                                        ...formik.values.lessonContents,
                                        {
                                            title: "Example title",
                                            photoUrl:
                                                "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
                                        },
                                    ]);
                                } else {
                                    formik.setFieldValue("lessonContents", [
                                        {
                                            title: "Example title",
                                            photoUrl:
                                                "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
                                        },
                                    ]);
                                }
                            }}
                            className={clsx("w-full mb-5")}
                        >
                            Add content
                        </Button>
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
                    <div
                        className={clsx({ hidden: current != 2 }, "w-full")}
                    ></div>
                </Form>
            </div>
        </main>
    );
}

const LessonContentInput = ({
    index,
    formik,
}: {
    index: number;
    formik: FormikProps<LessonType>;
}) => {
    const [fileList, setFileList] = useState<UploadFile<any>[]>([
        {
            uid: uuid(),
            name: "example photo",
            url: "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        },
    ]);
    useEffect(() => {
        formik.values.lessonContents?.map((content, idx) => {
            if (idx == index) {
                return {
                    ...content,
                    photoUrl: fileList[0]?.url,
                };
            }
            return content;
        });
    }, [fileList]);
    return (
        <div className="flex flex-col py-5 gap-5 border-b">
            <TextArea
                size="large"
                rows={4}
                value={formik.values.lessonContents?.[index].title}
                onChange={(e) => {
                    formik.setFieldValue(
                        "lessonContents",
                        formik.values.lessonContents?.map((content, idx) => {
                            if (idx == index) {
                                return {
                                    ...content,
                                    title: e.target.value,
                                };
                            }
                            return content;
                        })
                    );
                }}
            />
            <MultiplePhotoUpload
                maxCount={1}
                fileList={fileList}
                setFileList={setFileList}
            />
        </div>
    );
};
