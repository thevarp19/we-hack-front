"use client";
import { CourseDetails } from "@/components/edu/course/CourseDetails";
import { LessonsList } from "@/components/edu/lesson/LessonsList";
import { QuizList } from "@/components/edu/quiz/QuizList";
import { axiosShared } from "@/lib/axios";
import { CourseDetailsType, LessonType, QuizType } from "@/types/edu";
import { BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Tabs, TabsProps } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function CoursePage() {
    const courseView = mock;
    const params = useParams();
    const courseId = params.course;

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Lessons",
            children: (
                <div>
                    <LessonsList lessons={mockLessons} />
                    <QuizList quizzes={mockQuizzes} />
                </div>
            ),
        },
        {
            key: "2",
            label: "Details",
            children: <CourseDetails courseDetails={courseView} />,
        },
    ];
    const { data: courseData } = useQuery({
        queryKey: ["course", courseId],
        queryFn: async () => {
            const { data } = await axiosShared.get(
                `/api/edu/course/?all=false&id=5oT1llEWsdD8wIz2zz4T`
            );
            return data;
        },
        retry: 2,
    });

    useEffect(() => {
        console.log(courseData);
    }, [courseData]);

    return (
        <div>
            <div className="bg-course w-300 h-200 text-white">
                <h1 className="font-bold capitalize text-2xl">
                    {courseView.title}
                </h1>
                <div className="flex items-center gap-1">
                    <span className="capitalize text-base">
                        {courseView.level}
                    </span>
                    <svg height="10" width="10" className="dot">
                        <circle
                            cx="4"
                            cy="4"
                            r="2"
                            strokeWidth="3"
                            fill="#E5E7EB"
                        ></circle>
                    </svg>
                    <span className="">{courseView.duringInHours} hours</span>
                </div>
                <div className="flex">
                    <Card>
                        Lessons
                        <div>
                            <BookOutlined /> {courseView.lessonIds.length}
                        </div>
                    </Card>
                    <Card>
                        Quizzes{" "}
                        <div>
                            {" "}
                            <QuestionCircleOutlined />{" "}
                            {courseView.quizIds.length}
                        </div>
                    </Card>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

const mockQuizzes: QuizType[] = [
    {
        title: "Life Insurance Basics",
        questions: [
            // Question 1
            {
                question: "What is the primary purpose of life insurance?",
                answers: [
                    {
                        answer: "To provide financial support to your family in case of your death",
                        isCorrect: true,
                    },
                    {
                        answer: "To cover medical expenses",
                        isCorrect: false,
                    },
                    {
                        answer: "To invest in stock market",
                        isCorrect: false,
                    },
                    {
                        answer: "To save for retirement",
                        isCorrect: false,
                    },
                ],
            },
            // Question 2
            {
                question:
                    "Which type of life insurance policy offers lifelong coverage?",
                answers: [
                    {
                        answer: "Term Life Insurance",
                        isCorrect: false,
                    },
                    {
                        answer: "Whole Life Insurance",
                        isCorrect: true,
                    },
                    {
                        answer: "Universal Life Insurance",
                        isCorrect: false,
                    },
                    {
                        answer: "Variable Life Insurance",
                        isCorrect: false,
                    },
                ],
            },
            // Question 3
            {
                question:
                    "What determines the premium of a life insurance policy?",
                answers: [
                    {
                        answer: "Age and health of the insured",
                        isCorrect: true,
                    },
                    {
                        answer: "The insured's job",
                        isCorrect: false,
                    },
                    {
                        answer: "The insured's driving record",
                        isCorrect: false,
                    },
                    {
                        answer: "The insured's educational background",
                        isCorrect: false,
                    },
                ],
            },
            // Question 4
            {
                question:
                    "What does a life insurance policy's 'beneficiary' mean?",
                answers: [
                    {
                        answer: "The person who pays for the policy",
                        isCorrect: false,
                    },
                    {
                        answer: "The insurance agent",
                        isCorrect: false,
                    },
                    {
                        answer: "The person who receives the death benefit",
                        isCorrect: true,
                    },
                    {
                        answer: "The policyholder",
                        isCorrect: false,
                    },
                ],
            },
            // Question 5
            {
                question:
                    "Can you change the beneficiary of a life insurance policy?",
                answers: [
                    {
                        answer: "No, it's not possible",
                        isCorrect: false,
                    },
                    {
                        answer: "Yes, but only once",
                        isCorrect: false,
                    },
                    {
                        answer: "Yes, but only with permission from the current beneficiary",
                        isCorrect: false,
                    },
                ],
            },
        ],
    },
];

const mock: CourseDetailsType = {
    title: "Advanced Life Insurance Strategies",
    photoUrl:
        "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
    level: "advanced",
    duringInHours: 4,
    description:
        "Explore advanced strategies for maximizing life insurance benefits.",
    skills: ["Risk Management", "Beneficiary Planning"],
    goals: ["Optimize life insurance strategies"],
    isPrivate: false,
    lessonIds: ["lesson5", "lesson6"],
    quizIds: ["quiz3"],
};

const mockLessons: LessonType[] = [
    {
        title: "Introduction to Life Insurance",
    },
    {
        title: "Understanding Life Insurance Policies",
    },
    {
        title: "Advanced Life Insurance Strategies",
    },
    {
        title: "Claiming Life Insurance Benefits",
    },
];
