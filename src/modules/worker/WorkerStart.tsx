import { Select } from "antd";
import { FC } from "react";

interface WorkerStartProps {}

export const WorkerStart: FC<WorkerStartProps> = ({}) => {
    return (
        <div>
            <h2>Выберите кабинет</h2>
            <Select
                className="max-w-sm w-full"
                options={[
                    { label: "12 room", value: 12 },
                    { label: "13 room", value: 13 },
                ]}
            />
        </div>
    );
};
