import { QuizType } from "@/types/edu";
import { CheckCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import { FC } from "react";

interface QuizViewProps {
    quiz: QuizType;
}

export const QuizView: FC<QuizViewProps> = ({ quiz }) => {
    return (
        <Card>
            <div className="flex">
                <CheckCircleFilled />
                <div>
                    <h5 className="uppercase">Practice quiz</h5>
                    <h5>{quiz.title}</h5>
                </div>
            </div>
        </Card>
    );
};
