"use client";
import { LessonContentType } from "@/types/edu";
import { App, Button, Card } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function LessonPage() {
    const [activeContent, setActiveContent] = useState(0);
    const nextContent = () => {
        if (activeContent < mockLessonContent.length - 1)
            setActiveContent((prev) => prev + 1);
    };
    const prevContent = () => {
        if (activeContent > 0) setActiveContent((prev) => prev - 1);
    };
    const { message } = App.useApp();
    const onQuestion = async (answer: boolean) => {
        if (mockLessonContent[activeContent].isTitleValid === answer) {
            await message.success("Correct answer");
        } else {
            await message.error("Wrong answer");
        }
        nextContent();
    };
    return (
        <div className="w-max">
            <Card className="relative w-max">
                <h1 className="w-[300px]">
                    {mockLessonContent[activeContent].title}
                </h1>
                <Image
                    src={mockLessonContent[activeContent].photoUrl}
                    alt={mockLessonContent[activeContent].title}
                    width={300}
                    height={100}
                />
                <div
                    className="absolute top-0 left-0 w-1/2 h-full z-30"
                    onClick={prevContent}
                />
                <div
                    className="absolute top-0 right-0 w-1/2 h-full z-30"
                    onClick={() => {
                        if (
                            typeof mockLessonContent[activeContent]
                                .isTitleValid !== "boolean"
                        ) {
                            nextContent();
                        }
                    }}
                />
            </Card>
            {typeof mockLessonContent[activeContent].isTitleValid ===
                "boolean" && (
                <div className="flex justify-between">
                    <Button
                        onClick={() => {
                            onQuestion(true);
                        }}
                    >
                        True
                    </Button>
                    <Button
                        onClick={() => {
                            onQuestion(false);
                        }}
                    >
                        False
                    </Button>
                </div>
            )}
        </div>
    );
}

const mockLessonContent: LessonContentType[] = [
    {
        id: "lesson1",
        title: "What is life insurance?",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        id: "lesson2",
        title: "True or False: Life insurance provides coverage for your car.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: false,
    },
    {
        id: "lesson3",
        title: "Learning about different types of life insurance policies.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        id: "lesson4",
        title: "True or False: Term life insurance provides coverage for a specific period of time.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: true,
    },
    {
        id: "lesson5",
        title: "The importance of beneficiaries in life insurance.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        id: "lesson6",
        title: "True or False: Beneficiaries in a life insurance policy receive the benefits after the policyholder's death.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: true,
    },
];
