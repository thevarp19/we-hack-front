import { CourseView } from "@/components/edu/course/CourseView";
import { CourseDetailsType } from "@/types/edu";
import Link from "next/link";

export default function CoursesPage() {
    return (
        <div>
            <h1>Courses</h1>
            <div className="grid grid-cols-3 gap-5 w-max">
                {mockCourses.map((course, index) => (
                    <Link key={index} href={"/en/home/edu/1"}>
                        <CourseView courseView={course} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
const mockCourses: CourseDetailsType[] = [
    {
        title: "Introduction to Life Insurance",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        level: "advanced",
        duringInHours: 2,
        description: "Learn the basics of life insurance and its importance.",
        skills: ["Insurance Fundamentals", "Risk Assessment"],
        goals: ["Understand the concept of life insurance"],
        isPrivate: false,
        lessons: ["lesson1", "lesson2"],
        quizzes: ["quiz1"],
    },
    {
        title: "Understanding Life Insurance Policies",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        level: "advanced",
        duringInHours: 3,
        description:
            "Dive deeper into life insurance policies and their types.",
        skills: ["Policy Analysis", "Premium Calculation"],
        goals: ["Understand different life insurance policies"],
        isPrivate: false,
        lessons: ["lesson3", "lesson4"],
        quizzes: ["quiz2"],
    },
    {
        title: "Advanced Life Insurance Strategies",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        level: "advanced",
        duringInHours: 4,
        description:
            "Explore advanced strategies for maximizing life insurance benefits.",
        skills: ["Risk Management", "Beneficiary Planning"],
        goals: ["Optimize life insurance strategies"],
        isPrivate: false,
        lessons: ["lesson5", "lesson6"],
        quizzes: ["quiz3"],
    },
    {
        title: "Claiming Life Insurance Benefits",
        photoUrl:
            "https://img.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_1150-65899.jpg?size=626&ext=jpg",
        level: "advanced",
        duringInHours: 2.5,
        description: "Learn how to successfully claim life insurance benefits.",
        skills: ["Claims Processing", "Documentation"],
        goals: ["Know the process of claiming life insurance benefits"],
        isPrivate: false,
        lessons: ["lesson7", "lesson8"],
        quizzes: ["quiz4"],
    },
];
