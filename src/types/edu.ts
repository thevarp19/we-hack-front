export interface CourseDetailsType {
    title: string;
    photoUrl: string;
    level: CourseLevelType;
    duringInHours: number;
    description: string;
    skills: string[];
    goals: string[];
    isPrivate?: boolean;
    lessonIds: string[];
    quizIds: string[];
}

export type CourseLevelType = "beginner" | "intermediate" | "advanced";

export interface LessonType {
    id: string;
    title: string;
    lessonContentIds: string[];
}

export interface LessonContentType {
    id: string;
    title: string;
    photoUrl: string;
    isTitleValid?: boolean;
    nextLesson?: () => void;
    prevLesson?: () => void;
}

export interface QuizType {
    id: string;
    title: string;
    questions: QuestionType[];
}

export interface QuestionType {
    id: string;
    question: string;
    answers: AnswerType[];
}

export interface AnswerType {
    id: string;
    answer: string;
    isCorrect: boolean;
}
