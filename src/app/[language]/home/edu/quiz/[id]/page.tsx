"use client";
import { QuizQuestion } from "@/components/edu/quiz/QuizQuestion";
import { QuizType } from "@/types/edu";
import { App, Card } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LessonPage() {
    const [activeContent, setActiveContent] = useState(0);
    const questions = mockQuiz.questions;
    const nextContent = () => {
        if (activeContent < questions.length - 1) {
            setAnimation("left");
            setActiveContent((prev) => prev + 1);
            setTimeout(() => {
                setAnimation("initial");
            }, 1000);
        }
    };

    const { message } = App.useApp();
    const onQuestion = async (isValid: boolean) => {
        if (isValid) {
            await message.success("Correct answer", 1);
        } else {
            await message.error("Wrong answer", 1);
        }
        nextContent();
    };
    const [animation, setAnimation] = useState("initial");

    const variants = {
        initial: {
            x: 0,
            opacity: 1,
        },
        left: {
            x: -200,
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        right: {
            x: 200,
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };
    return (
        <div className="w-max">
            <Card className="">
                <motion.div
                    initial="initial"
                    animate={animation}
                    variants={variants}
                    className="relative  w-max"
                >
                    <h1 className="w-[300px]">
                        <QuizQuestion
                            question={questions[activeContent]}
                            onAnswerClick={(answer) => {
                                onQuestion(answer.isCorrect);
                            }}
                        />
                    </h1>
                </motion.div>
            </Card>
        </div>
    );
}

const mockQuiz: QuizType = {
    title: "Life Insurance Basics",
    questions: [
        // Question 1
        {
            question: "What is the primary purpose of life insurance?",
            answers: [
                {
                    answer: "To provide financial support to your family in case of your death",
                    isCorrect: true,
                },
                {
                    answer: "To cover medical expenses",
                    isCorrect: false,
                },
                {
                    answer: "To invest in stock market",
                    isCorrect: false,
                },
                {
                    answer: "To save for retirement",
                    isCorrect: false,
                },
            ],
        },
        // Question 2
        {
            question:
                "Which type of life insurance policy offers lifelong coverage?",
            answers: [
                {
                    answer: "Term Life Insurance",
                    isCorrect: false,
                },
                {
                    answer: "Whole Life Insurance",
                    isCorrect: true,
                },
                {
                    answer: "Universal Life Insurance",
                    isCorrect: false,
                },
                {
                    answer: "Variable Life Insurance",
                    isCorrect: false,
                },
            ],
        },
        // Question 3
        {
            question: "What determines the premium of a life insurance policy?",
            answers: [
                {
                    answer: "Age and health of the insured",
                    isCorrect: true,
                },
                {
                    answer: "The insured's job",
                    isCorrect: false,
                },
                {
                    answer: "The insured's driving record",
                    isCorrect: false,
                },
                {
                    answer: "The insured's educational background",
                    isCorrect: false,
                },
            ],
        },
        // Question 4
        {
            question: "What does a life insurance policy's 'beneficiary' mean?",
            answers: [
                {
                    answer: "The person who pays for the policy",
                    isCorrect: false,
                },
                {
                    answer: "The insurance agent",
                    isCorrect: false,
                },
                {
                    answer: "The person who receives the death benefit",
                    isCorrect: true,
                },
                {
                    answer: "The policyholder",
                    isCorrect: false,
                },
            ],
        },
        // Question 5
        {
            question:
                "Can you change the beneficiary of a life insurance policy?",
            answers: [
                {
                    answer: "No, it's not possible",
                    isCorrect: false,
                },
                {
                    answer: "Yes, but only once",
                    isCorrect: false,
                },
                {
                    answer: "Yes, but only with permission from the current beneficiary",
                    isCorrect: false,
                },
            ],
        },
    ],
};
