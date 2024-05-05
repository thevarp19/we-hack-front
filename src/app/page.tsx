"use client";
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [stage, setStage] = useState(1);

    const nextStage = () => {
        if (stage < 3) setStage(stage + 1);
    };

    const prevStage = () => {
        if (stage > 1) setStage(stage - 1);
    };

    return (
        <div className="min-h-screen bg-[#5143d4] text-white flex flex-col items-center justify-center p-4">
            <div className="space-y-8">
                {stage === 1 && (
                    <>
                        <div>
                            <Image
                                src="/images/queue.png"
                                width={360}
                                height={140}
                                alt="aaa"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl">
                                No more endless waiting in queues.
                            </p>
                            <Button type="primary" onClick={nextStage}>
                                Next
                            </Button>
                        </div>
                    </>
                )}
                {stage === 2 && (
                    <div className="text-center">
                        <p className="text-2xl">
                            Prebook your appointment to any IT parks in Kerala.
                        </p>
                        <Button type="primary" onClick={nextStage}>
                            Next
                        </Button>
                    </div>
                )}
                {stage === 3 && (
                    <div className="text-center">
                        <p className="text-2xl">
                            Help your friends to book their appointments also.
                        </p>
                        <Button type="primary" onClick={nextStage}>
                            Get started
                        </Button>
                    </div>
                )}
                <div className="flex justify-between w-full max-w-xs">
                    <Button onClick={prevStage} disabled={stage === 1}>
                        Previous
                    </Button>
                    <Button onClick={nextStage} disabled={stage === 3}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
