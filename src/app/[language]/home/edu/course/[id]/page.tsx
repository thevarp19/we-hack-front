"use client";
import { CourseDetails } from "@/components/edu/course/CourseDetails";
import { LessonsList } from "@/components/edu/lesson/LessonsList";
import { Loading } from "@/components/shared/Loading";
import { axiosShared } from "@/lib/axios";
import { CourseDetailsType, LessonType } from "@/types/edu";
import { BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { ConfigProvider, Tabs, TabsProps } from "antd";
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
            children: (
                <div className="max-w-[620px] pb-5">
                    <CourseDetails courseDetails={courseData} />
                </div>
            ),
        },
    ];

    return (
        <div className="px-5 pt-5">
            {(isPending || isLessonPending) && <Loading isFullScreen />}
            <div className="bg-course w-300 h-200 text-white p-6 sm:max-w-[620px] mb-5">
                <h1 className="font-semibold capitalize text-lg mb-4 w-full">
                    {courseData?.title}
                </h1>
                <div className="flex items-center gap-1 text-base mb-8">
                    <span className="capitalize ">{courseData?.level}</span>
                    <svg height="10" width="10" className="dot mt-1">
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
                <div className="flex gap-4">
                    <div className="w-[150px]">
                        <div className="text-lg text-yellow">Lessons</div>
                        <div className="text-lg">
                            <BookOutlined width={"30px"} /> {lessonData?.length}
                        </div>
                    </div>
                    <div className="w-[150px] ">
                        <div className="text-lg text-yellow">Quizzes</div>{" "}
                        <div className="text-lg">
                            {" "}
                            <QuestionCircleOutlined /> {0}
                        </div>
                    </div>
                </div>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 18,
                    },
                }}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </ConfigProvider>
        </div>
    );
}
