import { App, Button, Card, Form, Input, Select, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import OpenGraphPreview from "../shared/Home";

interface Filial {
    name: string;
    address: string;
    id: number;
    url: string;
}

export const NewQueue: FC = () => {
    const [filials, setFilials] = useState<Filial[]>([]);
    const [selectedFilial, setSelectedFilial] = useState<Filial | null>(null);
    const [consultants, setConsultants] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const services = [
        { id: 1, name: "Регистрация по месту жительства" },
        { id: 2, name: "Выдача паспорта" },
        { id: 3, name: "Замена водительских прав" },
        { id: 4, name: "Регистрация автомобиля" },
        { id: 5, name: "Справка о несудимости" },
        { id: 6, name: "Регистрация брака" },
        { id: 7, name: "Регистрация рождения" },
        { id: 8, name: "Подача налоговой декларации" },
        { id: 9, name: "Выдача справок и форм" },
        { id: 10, name: "Иные административные услуги" },
    ];

    const [stage, setStage] = useState<string>("select");
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
                `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/record?command=${type}`
            );
            setConsultants(response.data.headers);
            if (type === "live") {
                setStage("live");
            }
            if (type === "date") {
                setStage("date");
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
                `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/record?command=${type}`
            );
            setBookingTimes(response.data.result);
            if (type === "live") {
                setStage("live");
            }
            if (type === "date") {
                setStage("date");
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
    const handleSubmit = async (values: {
        iin: string;
        email: string;
        serviceName: string;
    }) => {
        if (!selectedFilial) return;
        console.log(values);
        setLoading(true);
        try {
            const response = await axios.post(
                stage === "date"
                    ? `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/handle?command=${stage}&slot=${selectedSlot}`
                    : `https://queue-service-bvrrx45lva-uc.a.run.app/api/establishment/${selectedFilial.id}/handle?command=${stage}`,
                {
                    iin: values.iin,
                    email: values.email,
                    serviceName: values.serviceName,
                }
            );
            console.log(response.data);
            message.success("Successfully");
            router.push("/queue");
            setLoading(false);
        } catch (error) {
            setError("An error occurred while submitting the form.");
            setLoading(false);
        }
    };
    if (loading)
        return (
            <div className="h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    const handleTimeSelection = (id: any) => {
        setSelectedSlot(id);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            {stage === "select" && (
                <>
                    <div className="flex flex-row justify-between px-6 py-4 space-x-4 w-full">
                        <button className="bg-red-500 px-4 py-2 rounded text-white">
                            Филлиалы
                        </button>
                    </div>
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
                                </p>
                                <Link
                                    href={filial?.url || "#"}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <OpenGraphPreview url={filial.url} />
                                </Link>
                            </Card>
                        ))}
                    </div>
                </>
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
                        onClick={() => handleBookingTimeSlot("date")}
                    >
                        Забронировать время
                    </button>
                </div>
            )}
            {stage === "live" && (
                <div className="flex flex-col ">
                    <div className="flex flex-col items-center justify-center py-10">
                        <h2 className="text-2xl mb-4 text-center">
                            {selectedFilial?.name}
                        </h2>
                        <div className="space-y-4 w-full max-w-md !px-5">
                            <Card className="rounded-lg shadow">
                                {consultants.length > 0 ? (
                                    consultants.map((message, index) => (
                                        <div key={index}>
                                            <p className="text-lg">{message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p></p>
                                )}
                            </Card>
                        </div>
                    </div>
                    <Form
                        onFinish={handleSubmit}
                        className="w-full max-w-xl p-5 !px-5"
                    >
                        <Form.Item
                            name="iin"
                            label="ИИН"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your ИИН!",
                                },
                            ]}
                        >
                            <Input placeholder="Введите ИИН" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Почта"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input placeholder="Введите email" />
                        </Form.Item>
                        <Form.Item
                            name="serviceId"
                            label="Услуги"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a service!",
                                },
                            ]}
                        >
                            <Select placeholder="Выберите тип услуги">
                                {services.map((service) => (
                                    <Select.Option
                                        key={service.id}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item className="flex justify-center w-full">
                            <Button
                                type="primary"
                                className="w-[150px]"
                                htmlType="submit"
                            >
                                Запись
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
            {stage === "date" && (
                <div className="flex flex-col py-10">
                    <h2 className="text-2xl mb-4 text-center">
                        {selectedFilial?.name}
                    </h2>
                    <h2 className="text-2xl mb-4 text-center">
                        Выберите время
                        <div className="flex flex-wrap justify-center">
                            {bookingTimes?.map((time: any) => (
                                <div
                                    key={time?.id}
                                    onClick={() => handleTimeSelection(time.id)}
                                    className="p-2"
                                >
                                    <button className="bg-blue-500 px-6 py-2 rounded text-white m-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
                                        {time?.slot}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </h2>
                    <Form
                        onFinish={handleSubmit}
                        className="w-full max-w-xl p-5 !px-5"
                    >
                        <Form.Item
                            name="iin"
                            label="ИИН"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your ИИН!",
                                },
                            ]}
                        >
                            <Input placeholder="Введите ИИН" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Почта"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input placeholder="Введите email" />
                        </Form.Item>
                        <Form.Item
                            name="serviceId"
                            label="Услуги"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a service!",
                                },
                            ]}
                        >
                            <Select placeholder="Выберите тип услуги">
                                {services.map((service) => (
                                    <Select.Option
                                        key={service.id}
                                        value={service.id}
                                    >
                                        {service.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item className="flex justify-center w-full">
                            <Button
                                type="primary"
                                className="w-[150px]"
                                htmlType="submit"
                            >
                                Запись
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};
