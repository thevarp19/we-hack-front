"use client";
import { CourseDetails } from "@/components/edu/course/CourseDetails";
import { LessonsList } from "@/components/edu/lesson/LessonsList";
import { Loading } from "@/components/shared/Loading";
import { axiosShared } from "@/lib/axios";
import { CourseDetailsType, LessonType } from "@/types/edu";
import { BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Tabs, TabsProps } from "antd";
import { useParams } from "next/navigation";

export default function CoursePage() {
    const params = useParams();
    const courseId = params.id;

    const { data: courseData, isPending } = useQuery<CourseDetailsType>({
        queryKey: ["course", courseId],
        queryFn: async () => {
            const { data } = await axiosShared.get<CourseDetailsType>(
                `/api/edu/course/?id=${courseId}`
            );
            return data;
        },
        retry: 2,
    });

    const { data: lessonData, isPending: isLessonPending } = useQuery<
        LessonType[]
    >({
        queryKey: ["lessons", courseId],
        queryFn: async () => {
            const { data } = await axiosShared.put<LessonType[]>(
                `/api/edu/lesson/?courseId=${courseId}`
            );
            return data;
        },
        retry: 2,
    });

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Lessons",
            children: (
                <div>
                    <LessonsList lessons={lessonData || []} />
                </div>
            ),
        },
        {
            key: "2",
            label: "Details",
            children: <CourseDetails courseDetails={courseData} />,
        },
    ];

    return (
        <div>
            {(isPending || isLessonPending) && <Loading isFullScreen />}
            <div className="bg-course w-300 h-200 text-white">
                <h1 className="font-bold capitalize text-2xl">
                    {courseData?.title}
                </h1>
                <div className="flex items-center gap-1">
                    <span className="capitalize text-base">
                        {courseData?.level}
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
                    <span className="">{courseData?.duringInHours} hours</span>
                </div>
                <div className="flex">
                    <Card>
                        Lessons
                        <div>
                            <BookOutlined /> {lessonData?.length}
                        </div>
                    </Card>
                    <Card>
                        Quizzes{" "}
                        <div>
                            {" "}
                            <QuestionCircleOutlined /> {0}
                        </div>
                    </Card>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}
