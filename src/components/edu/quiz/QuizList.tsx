import { QuizType } from "@/types/edu";
import Link from "next/link";
import { FC } from "react";
import { QuizView } from "./QuizView";

interface QuizListProps {
    quizzes: QuizType[];
}

export const QuizList: FC<QuizListProps> = ({ quizzes }) => {
    return (
        <div className="flex flex-col gap-4">
            {quizzes.map((quiz) => (
                <Link href={`/en/home/edu/1/quiz/${quiz.id}`} key={quiz.id}>
                    <QuizView quiz={quiz} key={quiz.id} />
                </Link>
            ))}
        </div>
    );
};
