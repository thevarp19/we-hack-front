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
            <div className="flex">
                <CheckCircleFilled />
                <div>
                    <h5>Lesson {index}</h5>
                    <h5>{lesson.title}</h5>
                </div>
            </div>
        </Card>
    );
};
