import { LessonType } from "@/types/edu";
import { CheckCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import { FC } from "react";

interface LessonViewProps {
    lesson: LessonType;
    index: number;
}

export const LessonView: FC<LessonViewProps> = ({ lesson, index }) => {
    return (
        <Card>
            <div className="flex gap-4 items-start cursor-pointer">
                <CheckCircleFilled style={{ color: "#fbae16" }} />
                <div>
                    <h5 className="leading-none">Lesson {index}</h5>
                    <h5 className="font-bold text-base mt-2">{lesson.title}</h5>
                </div>
            </div>
        </Card>
    );
};
