"use client";
import { LessonContentType } from "@/types/edu";
import { App, Button, Card } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function LessonPage() {
    const [activeContent, setActiveContent] = useState(0);
    const nextContent = () => {
        if (activeContent < mockLessonContent.length - 1) {
            setAnimation("left");
            setActiveContent((prev) => prev + 1);
            setTimeout(() => {
                setAnimation("initial");
            }, 1000);
        }
    };
    const prevContent = () => {
        if (activeContent > 0) {
            setAnimation("right");
            setActiveContent((prev) => prev - 1);
            setTimeout(() => {
                setAnimation("initial");
            }, 1000);
        }
    };
    const { message } = App.useApp();
    const onQuestion = async (answer: boolean) => {
        if (mockLessonContent[activeContent].isTitleValid === answer) {
            await message.success("Correct answer", 1);
        } else {
            await message.error("Wrong answer", 1);
        }

        nextContent();
    };
    const [animation, setAnimation] = useState("initial");

    const variants = {
        initial: {
            x: 0,
            opacity: 1,
        },
        left: {
            x: -200, // Adjust this value for the amount of slide to the left
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        right: {
            x: 200, // Adjust this value for the amount of slide to the right
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };
    return (
        <div className="w-max">
            <Card className="">
                <motion.div
                    initial="initial"
                    animate={animation}
                    variants={variants}
                    className="relative  w-max"
                >
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
                </motion.div>
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
            </Card>
        </div>
    );
}

const mockLessonContent: LessonContentType[] = [
    {
        title: "What is life insurance?",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        title: "True or False: Life insurance provides coverage for your car.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: false,
    },
    {
        title: "Learning about different types of life insurance policies.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        title: "True or False: Term life insurance provides coverage for a specific period of time.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: true,
    },
    {
        title: "The importance of beneficiaries in life insurance.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    },
    {
        title: "True or False: Beneficiaries in a life insurance policy receive the benefits after the policyholder's death.",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        isTitleValid: true,
    },
];
