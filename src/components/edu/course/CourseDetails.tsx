import { CourseDetailsType } from "@/types/edu";
import { CheckOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { FC, useId } from "react";

interface CourseDetailsProps {
    courseDetails: CourseDetailsType | undefined;
}

export const CourseDetails: FC<CourseDetailsProps> = ({ courseDetails }) => {
    return (
        <div>
            <div>
                <h2>Course description</h2>
                <div>{courseDetails?.description}</div>
            </div>
            <div>
                <h2>Received skills</h2>
                <div>
                    {courseDetails?.skills.map((skill, index) => (
                        <Tag key={useId()}>{skill}</Tag>
                    ))}
                </div>
            </div>
            <div>
                <h2>What will you learn</h2>
                <div>
                    {courseDetails?.goals.map((goal) => (
                        <div key={useId()} className="flex items-center gap-1">
                            {" "}
                            <CheckOutlined />
                            {goal}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
