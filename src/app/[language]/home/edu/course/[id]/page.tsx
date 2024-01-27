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
                `/api/edu/course/?all=false&id=58onilcDDcCcBA3TjCMq`
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
        id: "quiz_life_insurance_101",
        title: "Life Insurance Basics",
        questions: [
            // Question 1
            {
                id: "q1",
                question: "What is the primary purpose of life insurance?",
                answers: [
                    {
                        id: "q1a1",
                        answer: "To provide financial support to your family in case of your death",
                        isCorrect: true,
                    },
                    {
                        id: "q1a2",
                        answer: "To cover medical expenses",
                        isCorrect: false,
                    },
                    {
                        id: "q1a3",
                        answer: "To invest in stock market",
                        isCorrect: false,
                    },
                    {
                        id: "q1a4",
                        answer: "To save for retirement",
                        isCorrect: false,
                    },
                ],
            },
            // Question 2
            {
                id: "q2",
                question:
                    "Which type of life insurance policy offers lifelong coverage?",
                answers: [
                    {
                        id: "q2a1",
                        answer: "Term Life Insurance",
                        isCorrect: false,
                    },
                    {
                        id: "q2a2",
                        answer: "Whole Life Insurance",
                        isCorrect: true,
                    },
                    {
                        id: "q2a3",
                        answer: "Universal Life Insurance",
                        isCorrect: false,
                    },
                    {
                        id: "q2a4",
                        answer: "Variable Life Insurance",
                        isCorrect: false,
                    },
                ],
            },
            // Question 3
            {
                id: "q3",
                question:
                    "What determines the premium of a life insurance policy?",
                answers: [
                    {
                        id: "q3a1",
                        answer: "Age and health of the insured",
                        isCorrect: true,
                    },
                    {
                        id: "q3a2",
                        answer: "The insured's job",
                        isCorrect: false,
                    },
                    {
                        id: "q3a3",
                        answer: "The insured's driving record",
                        isCorrect: false,
                    },
                    {
                        id: "q3a4",
                        answer: "The insured's educational background",
                        isCorrect: false,
                    },
                ],
            },
            // Question 4
            {
                id: "q4",
                question:
                    "What does a life insurance policy's 'beneficiary' mean?",
                answers: [
                    {
                        id: "q4a1",
                        answer: "The person who pays for the policy",
                        isCorrect: false,
                    },
                    {
                        id: "q4a2",
                        answer: "The insurance agent",
                        isCorrect: false,
                    },
                    {
                        id: "q4a3",
                        answer: "The person who receives the death benefit",
                        isCorrect: true,
                    },
                    {
                        id: "q4a4",
                        answer: "The policyholder",
                        isCorrect: false,
                    },
                ],
            },
            // Question 5
            {
                id: "q5",
                question:
                    "Can you change the beneficiary of a life insurance policy?",
                answers: [
                    {
                        id: "q5a1",
                        answer: "No, it's not possible",
                        isCorrect: false,
                    },
                    {
                        id: "q5a2",
                        answer: "Yes, but only once",
                        isCorrect: false,
                    },
                    { id: "q5a3", answer: "Yes, at any time", isCorrect: true },
                    {
                        id: "q5a4",
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
        lessonContentIds: ["lesson1", "lesson2"],
        id: "quiz1",
    },
    {
        title: "Understanding Life Insurance Policies",
        lessonContentIds: ["lesson3", "lesson4"],
        id: "quiz2",
    },
    {
        title: "Advanced Life Insurance Strategies",
        lessonContentIds: ["lesson5", "lesson6"],
        id: "quiz3",
    },
    {
        title: "Claiming Life Insurance Benefits",
        lessonContentIds: ["lesson7", "lesson8"],
        id: "quiz4",
    },
];
