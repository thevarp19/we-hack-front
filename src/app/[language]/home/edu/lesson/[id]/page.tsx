"use client";
import { Loading } from "@/components/shared/Loading";
import { axiosShared } from "@/lib/axios";
import { LessonContentType, LessonType } from "@/types/edu";
import { useQuery } from "@tanstack/react-query";
import { App, Button, Card, Tour, TourProps } from "antd";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LessonPage() {
    const params = useParams();
    const lessonId = params.id;
    const { data: lessonData, isPending } = useQuery<LessonType>({
        queryKey: ["course", lessonId],
        queryFn: async () => {
            const { data } = await axiosShared.get<LessonType>(
                `/api/edu/lesson/?id=${lessonId}`
            );
            return data;
        },
        retry: 2,
    });
    const [activeContent, setActiveContent] = useState(0);
    const nextContent = () => {
        if (activeContent < (lessonData?.lessonContents?.length || 0) - 1) {
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
        if (
            lessonData?.lessonContents?.[activeContent].isTitleValid === answer
        ) {
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
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const steps: TourProps["steps"] = [
        {
            title: "Knowledge quote",
            description: "Get knowledge from the quote",
            target: () => ref1.current,
        },
        {
            title: "Next content",
            description: "Tap to this to go to the next content",
            target: () => ref3.current,
        },
        {
            title: "Previous content",
            description: "Tap to this to go to the previous content",
            target: () => ref2.current,
        },
    ];
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 1500);
    }, []);
    return (
        <>
            <Tour
                open={open}
                onClose={() => setOpen(false)}
                steps={steps}
                className="max-sm:w-[270px]"
            />
            <div className="w-full py-10 flex justify-center">
                {isPending && <Loading isFullScreen />}
                <Card className="">
                    <motion.div
                        initial="initial"
                        animate={animation}
                        variants={variants}
                        className="relative w-max"
                    >
                        <h1
                            className="w-[400px] max-sm:w-[300px] text-base mb-5"
                            ref={ref1}
                        >
                            {lessonData?.lessonContents?.[activeContent].title}
                        </h1>
                        <Image
                            src={
                                lessonData?.lessonContents?.[activeContent]
                                    .photoUrl || ""
                            }
                            alt={
                                lessonData?.lessonContents?.[activeContent]
                                    .title || ""
                            }
                            width={400}
                            height={400}
                            className="max-sm:w-[300px]"
                        />
                        <div
                            ref={ref2}
                            className="absolute top-0 left-0 w-1/2 h-full z-30"
                            onClick={prevContent}
                        />
                        <div
                            ref={ref3}
                            className="absolute top-0 right-0 w-1/2 h-full z-30"
                            onClick={() => {
                                if (
                                    typeof lessonData?.lessonContents?.[
                                        activeContent
                                    ].isTitleValid !== "boolean"
                                ) {
                                    nextContent();
                                }
                            }}
                        />
                    </motion.div>
                    {
                        <div
                            className={clsx("flex justify-between mt-5", {
                                invisible:
                                    typeof lessonData?.lessonContents?.[
                                        activeContent
                                    ].isTitleValid !== "boolean",
                            })}
                        >
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
                    }
                </Card>
            </div>
        </>
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
