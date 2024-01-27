import { LessonType } from "@/types/edu";
import { CheckCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import { FC } from "react";

interface LessonViewProps {
    lesson: LessonType;
}

export const LessonView: FC<LessonViewProps> = ({ lesson }) => {
    return (
        <Card>
            <div className="flex">
                <CheckCircleFilled />
                <div>
                    <h5>Lesson {lesson.number}</h5>
                    <h5>{lesson.title}</h5>
                </div>
            </div>
        </Card>
    );
};
