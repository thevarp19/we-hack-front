"use client";
import { Loading } from "@/components/shared/Loading";
import { axiosShared } from "@/lib/axios";
import { CourseDetailsType } from "@/types/edu";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import Link from "next/link";

export default function AdminPage() {
    const { data: courses, isPending } = useQuery<CourseDetailsType[]>({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosShared.get<CourseDetailsType[]>(
                `/api/edu/course/?all=true`
            );
            return data;
        },
        retry: 2,
    });
    const columns: TableProps<CourseDetailsType | undefined>["columns"] = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a?.title.localeCompare(b?.title || "") || 0,
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "age",
        },
        {
            title: "During in hours",
            dataIndex: "duringInHours",
            key: "duringInHours",
            sorter: (a, b) => (a?.duringInHours || 0) - (b?.duringInHours || 0),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Link
                    href={`/en/admin/lesson/?courseId=${record?.id}`}
                    className="cursor-pointer"
                >
                    Add lesson
                </Link>
            ),
        },
    ];
    return (
        <div className="py-5">
            {isPending && <Loading isFullScreen />}
            <Link href="/en/admin/course">
                <Button type="primary">Create course</Button>
            </Link>
            <div className="mb-5"></div>
            <Table
                dataSource={courses?.map((course, index) => ({
                    key: course?.id,
                    ...course,
                }))}
                // @ts-ignore
                columns={columns}
            />
        </div>
    );
}
