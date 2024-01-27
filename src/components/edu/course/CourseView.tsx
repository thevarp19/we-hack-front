import { CourseDetailsType } from "@/types/edu";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { FC } from "react";

interface CourseViewProps {
    courseView: CourseDetailsType;
}

export const CourseView: FC<CourseViewProps> = ({ courseView }) => {
    return (
        <Card
            hoverable
            className="w-[300px] h-[225px]"
            cover={
                <Image
                    src={
                        courseView?.photoUrl ||
                        "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg"
                    }
                    alt={courseView.title}
                    width={300}
                    height={100}
                    className="object-cover h-[100px]"
                />
            }
        >
            <Meta
                title={courseView.title}
                description={
                    <div className="flex flex-col gap-1">
                        <span className="capitalize text-primary text-base">
                            {courseView.level}
                        </span>
                        <span className="text-yellow">
                            {courseView.duringInHours} hours
                        </span>
                    </div>
                }
            />
        </Card>
    );
};
