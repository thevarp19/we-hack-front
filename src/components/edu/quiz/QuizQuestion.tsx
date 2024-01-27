import { AnswerType, QuestionType } from "@/types/edu";
import { Card } from "antd";
import { FC } from "react";

interface QuizQuestionProps {
    question: QuestionType;
    onAnswerClick: (answer: AnswerType) => void;
}

export const QuizQuestion: FC<QuizQuestionProps> = ({
    question,
    onAnswerClick,
}) => {
    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {question.answers.map((answer, index) => (
                    <Card
                        key={index}
                        onClick={() => {
                            onAnswerClick(answer);
                        }}
                    >
                        {answer.answer}
                    </Card>
                ))}
            </div>
        </div>
    );
};
