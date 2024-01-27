import { CourseDetailsType } from "@/types/edu";
import { CheckOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { FC } from "react";
import { v4 as uuid } from "uuid";
interface CourseDetailsProps {
    courseDetails: CourseDetailsType | undefined;
}

export const CourseDetails: FC<CourseDetailsProps> = ({ courseDetails }) => {
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-lg text-primary font-semibold mb-3">
                    Course description
                </h2>
                <div className="text-lg">{courseDetails?.description}</div>
            </div>
            <div className="mb-5">
                <h2 className="text-lg text-primary font-semibold mb-3">
                    Received skills
                </h2>
                <div className="flex flex-wrap ">
                    {courseDetails?.skills.map((skill, index) => (
                        <div key={uuid()} className="mb-3">
                            {" "}
                            <Tag>{skill}</Tag>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5">
                <h2 className="text-lg text-primary font-semibold mb-3">
                    What will you learn
                </h2>
                <div>
                    {courseDetails?.goals.map((goal) => (
                        <div key={uuid()} className="flex items-center gap-4">
                            {" "}
                            <CheckOutlined
                                style={{ color: "#fbae16" }}
                                className="text-yellow text-2xl"
                            />
                            {goal}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
