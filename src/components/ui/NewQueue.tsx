import { App, Card } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface Filial {
    name: string;
    address: string;
    id: number;
    url: string;
}

interface Consultant {
    // Define attributes of consultants if needed
}

export const NewQueue: FC = () => {
    const [filials, setFilials] = useState<Filial[]>([]);
    const [selectedFilial, setSelectedFilial] = useState<Filial | null>(null);
    const [consultants, setConsultants] = useState<Consultant[]>([]); // State to store consultants data
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [stage, setStage] = useState<string>("select"); // 'select', 'options'
    const [bookingTimes, setBookingTimes] = useState([]);
    const { message } = App.useApp();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/"
                );
                setFilials(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError("An error occurred while fetching the data.");
                } else {
                    setError("An unexpected error occurred.");
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleSelectFilial = (filial: Filial) => {
        setSelectedFilial(filial);
        setStage("options");
    };
    const handleQueueTypeSelection = async (type: string) => {
        if (!selectedFilial) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/consultants/?type=${type}`
            );
            setConsultants(response.data);
            if (type === "live") {
                setStage("live");
            }
            if (type === "date") {
                setStage("bookingTime");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("Failed to fetch consultants.");
            } else {
                setError(
                    "An unexpected error occurred while fetching consultants."
                );
            }
        }
        setLoading(false);
    };
    const handleBookingTimeSlot = async (type: string) => {
        if (!selectedFilial) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/consultants/?type=${type}`
            );
            setConsultants(response.data);
            if (type === "live") {
                setStage("live");
            }
            if (type === "date") {
                setStage("bookingTime");
            }
            message.success("Time booked successfully");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("Failed to fetch consultants.");
            } else {
                setError(
                    "An unexpected error occurred while fetching consultants."
                );
            }
            message.error("Failed to book time");
        }
        setLoading(false);
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex flex-row justify-between px-6 py-4 space-x-4 w-full">
                <button className="bg-red-500 px-4 py-2 rounded text-white">
                    Филлиалы
                </button>
            </div>
            {stage === "select" && (
                <div className="flex flex-col w-full px-6 gap-5">
                    {filials.map((filial, index) => (
                        <Card
                            key={index}
                            title={filial.name}
                            bordered={false}
                            className="rounded-lg shadow-lg"
                            onClick={() => handleSelectFilial(filial)}
                        >
                            <p className="flex justify-between">
                                <strong>Address: {filial.address}</strong>
                                <Link href={filial?.url || "#"}>
                                    <Image
                                        src="/icons/map.png"
                                        width={48}
                                        height={48}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </Link>
                            </p>
                        </Card>
                    ))}
                </div>
            )}
            {stage === "options" && selectedFilial && (
                <div className="flex flex-col items-center justify-center py-10">
                    <h2 className="text-2xl mb-4 text-center">
                        {selectedFilial.name}
                    </h2>
                    <button
                        className="bg-blue-500 px-6 py-2 rounded text-white m-2"
                        onClick={() => handleQueueTypeSelection("live")}
                    >
                        Живая очередь
                    </button>
                    <button
                        className="bg-green-500 px-6 py-2 rounded text-white m-2"
                        onClick={() => handleQueueTypeSelection("date")}
                    >
                        Забронировать время
                    </button>
                </div>
            )}
            {stage === "consultants" && (
                <div>
                    {/* Display consultants or next steps here based on fetched data */}
                </div>
            )}
            {stage === "bookingTime" && (
                <div>
                    <h2 className="text-2xl mb-4 text-center">
                        Выберите время
                        <div className="flex flex-wrap">
                            {bookingTimes.map((time) => (
                                <div className="p-2">
                                    <button className="bg-blue-500 px-6 py-2 rounded text-white m-2">
                                        10:00
                                    </button>
                                </div>
                            ))}
                            <div className="p-2">
                                <button className="bg-blue-500 px-6 py-2 rounded text-white m-2">
                                    10:00
                                </button>
                            </div>
                            <div className="p-2">
                                <button className="bg-blue-500 px-6 py-2 rounded text-white m-2">
                                    11:00
                                </button>
                            </div>
                            <div className="p-2">
                                <button className="bg-blue-500 px-6 py-2 rounded text-white m-2">
                                    12:00
                                </button>
                            </div>
                        </div>
                    </h2>
                </div>
            )}
        </div>
    );
};
