export interface CourseDetailsType {
    title: string;
    photoUrl: string;
    level: CourseLevelType;
    duringInHours: number;
    description: string;
    skills: string[];
    goals: string[];
    isPrivate?: boolean;
    lessons: string[];
    quizzes: string[];
}

export interface LessonType {
    id: string;
    number: number;
    title: string;
    lessonContents: string[];
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

export type CourseLevelType = "beginner" | "intermediate" | "advanced";
