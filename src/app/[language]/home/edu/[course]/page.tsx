import { LessonsList } from "@/components/edu/lesson/LessonsList";
import { LessonType } from "@/types/edu";
import { BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Tabs, TabsProps } from "antd";

export default function CoursePage() {
    const courseView = mock;
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Lessons",
            children: <LessonsList lessons={mockLessons} />,
        },
        {
            key: "2",
            label: "Quizzes",
            children: "Content of Tab Pane 2",
        },
    ];
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
                            stroke-width="3"
                            fill="#E5E7EB"
                        ></circle>
                    </svg>
                    <span className="">{courseView.duringInHours} hours</span>
                </div>
                <div className="flex">
                    <Card>
                        Lessons
                        <div>
                            <BookOutlined /> {courseView.lessons.length}
                        </div>
                    </Card>
                    <Card>
                        Quizzes{" "}
                        <div>
                            {" "}
                            <QuestionCircleOutlined />{" "}
                            {courseView.quizzes.length}
                        </div>
                    </Card>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

const mock = {
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
    lessons: ["lesson5", "lesson6"],
    quizzes: ["quiz3"],
};

const mockLessons: LessonType[] = [
    {
        title: "Introduction to Life Insurance",
        number: 1,
        lessonContents: ["lesson1", "lesson2"],
        id: "quiz1",
    },
    {
        title: "Understanding Life Insurance Policies",
        number: 1,
        lessonContents: ["lesson3", "lesson4"],
        id: "quiz2",
    },
    {
        title: "Advanced Life Insurance Strategies",
        number: 1,
        lessonContents: ["lesson5", "lesson6"],
        id: "quiz3",
    },
    {
        title: "Claiming Life Insurance Benefits",
        number: 1,
        lessonContents: ["lesson7", "lesson8"],
        id: "quiz4",
    },
];
