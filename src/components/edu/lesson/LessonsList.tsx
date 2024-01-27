import { LessonType } from "@/types/edu";
import Link from "next/link";
import { FC } from "react";
import { LessonView } from "./LessonView";

interface LessonsListProps {
    lessons: LessonType[];
}

export const LessonsList: FC<LessonsListProps> = ({ lessons }) => {
    return (
        <div className="flex flex-col gap-4">
            {lessons.map((lesson) => (
                <Link href={`/en/home/edu/1/${lesson.id}`} key={lesson.id}>
                    <LessonView lesson={lesson} key={lesson.id} />
                </Link>
            ))}
        </div>
    );
};
