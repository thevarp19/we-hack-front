"use client";
import { CourseView } from "@/components/edu/course/CourseView";
import { Loading } from "@/components/shared/Loading";
import { axiosShared } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CoursesPage() {
    const { data: courses, isPending } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosShared.get(`/api/edu/course/?all=true`);
            return data;
        },
        retry: 2,
    });

    return (
        <>
            <h1 className="text-xl my-5 font-semibold">Courses</h1>
            <div className="max-h-max pb-10 flex justify-center">
                {isPending ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-2 pb-5 max-sm:grid-cols-1 gap-5 w-max ">
                        {courses.map((course: any, index: number) => (
                            <Link
                                key={index}
                                href={`/en/home/edu/course/${course.id}`}
                                className="h-max"
                            >
                                <CourseView courseView={course} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
