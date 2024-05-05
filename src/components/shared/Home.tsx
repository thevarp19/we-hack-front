"use client";
import { SearchByINN } from "@/modules/search/components/SearchByINN";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, Spin, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const { Header, Content, Footer } = Layout;
const { Text } = Typography;
interface EstablishmentInfo {
    id: number;
    name: string;
    address: string;
    url: string;
}

interface ConsultantInfo {
    name: string;
    type: string; // Assuming 'type' could be more explicitly defined, possibly with a union type like 'live' | 'booked'
    establishment: EstablishmentInfo;
}

interface BookingInfo {
    date: string;
    time_slot: string;
    consultant: string;
}

interface ClientBooking {
    id: number;
    email: string;
    iin: string;
    status: string;
    consultant_info: ConsultantInfo;
    booking_info?: BookingInfo;
}
export const Home: React.FC = () => {
    const [bookings, setBookings] = useState<ClientBooking[]>();
    const [loading, setLoading] = useState(false);
    return (
        <Layout className="min-h-screen">
            <Content className="m-3 bg-white p-3 h-screen">
                <div className="site-layout-content bg-white p-6 rounded shadow flex flex-col items-center">
                    <SearchByINN
                        setBookings={setBookings}
                        setLoading={setLoading}
                        loading={loading}
                    />
                    <Text className="text-3xl">Ваши записи</Text>
                    <div className="my-6">
                        {(bookings?.length || 0) > 0 && !loading && (
                            <div>
                                <p className="text-center mb-4">
                                    У вас {bookings?.length} записей
                                </p>
                                <ul className="flex flex-col gap-4">
                                    {bookings?.map((booking, index) => (
                                        <li key={index} className="max-w-sm">
                                            {/* <Card
                                                title={
                                                    booking.consultant_info.name
                                                }
                                                extra={
                                                    <span>
                                                        <ThunderboltOutlined />{" "}
                                                        {booking.consultant_info
                                                            .type === "live"
                                                            ? "Живая очередь"
                                                            : "Забронированный"}
                                                    </span>
                                                }
                                                style={{
                                                    width: "min(calc(100vw - 20px), 384px)",
                                                }}
                                            >
                                                {booking.consultant_info
                                                    .type === "live" && (
                                                    <div className="flex items-center gap-4 text-xl">
                                                        <ClockCircleOutlined />
                                                        Ожидаемое время{" "}
                                                        {
                                                            booking
                                                                ?.booking_info
                                                                ?.time_slot
                                                        }
                                                    </div>
                                                )}
                                            </Card> */}

                                            <Card
                                                title={
                                                    booking.consultant_info.name
                                                }
                                                extra={
                                                    <span>
                                                        {booking.consultant_info
                                                            .type === "live" ? (
                                                            <>
                                                                Живая очередь{" "}
                                                                <ThunderboltOutlined />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircleOutlined />{" "}
                                                                Забронированный
                                                            </>
                                                        )}
                                                    </span>
                                                }
                                                style={{
                                                    width: "min(calc(100vw - 20px), 384px)",
                                                }}
                                            >
                                                <div className="flex items-center gap-4 text-xl pb-4">
                                                    <HomeOutlined />
                                                    Окошко №{" "}
                                                    {
                                                        booking?.consultant_info
                                                            .establishment.id
                                                    }
                                                </div>
                                                <div className="flex items-center gap-4 text-xl">
                                                    <ClockCircleOutlined />
                                                    Время консультации <br />{" "}
                                                    {booking?.booking_info ===
                                                        null && "Живой"}
                                                    {
                                                        booking?.booking_info
                                                            ?.date
                                                    }{" "}
                                                    {
                                                        booking?.booking_info
                                                            ?.time_slot
                                                    }
                                                </div>

                                                <OpenGraphPreview
                                                    url={
                                                        booking.consultant_info
                                                            .establishment.url
                                                    }
                                                />
                                                <Link
                                                    href={"/map"}
                                                    className="flex justify-center py-3"
                                                >
                                                    <Button type="primary">
                                                        Маршрут
                                                    </Button>
                                                </Link>
                                            </Card>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {loading && <Spin />}
                        {bookings?.length === 0 && !loading && (
                            <div className="text-center">
                                <p>Пусто</p>
                                <p>Похоже, вы не добавили новых записей.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Content>
            <div className="fixed bottom-0 w-full flex justify-between bg-gray-200 text-white text-lg py-3 px-6">
                <Image src="/icons/home.png" width={30} height={30} alt="aaa" />
                <div className="border border-black rounded-full">
                    <Link href="queue/new">
                        <Image
                            src="/icons/Add_round.png"
                            width={30}
                            height={30}
                            alt="aaa"
                        />
                    </Link>
                </div>
                <Link href="/queue">
                    <Image
                        src="/icons/queue.png"
                        width={30}
                        height={30}
                        alt="aaa"
                    />{" "}
                </Link>
            </div>
        </Layout>
    );
};

export const OpenGraphPreview = ({ url }: { url: string }) => {
    const [ogData, setOgData] = useState({
        title: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        const fetchData = async (retryCount = 0) => {
            try {
                const proxyUrl =
                    "https://cors-proxy-gamma.vercel.app/proxy?url=";
                const response = await axios.get(`${proxyUrl}${url}`);

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(
                    response.data,
                    "text/html"
                );
                const metaTags = htmlDocument.getElementsByTagName("meta");

                let ogMeta = { title: "", description: "", image: "" };
                // @ts-ignore
                for (let tag of metaTags) {
                    if (tag.getAttribute("property") === "og:title") {
                        ogMeta.title = tag.getAttribute("content");
                    } else if (
                        tag.getAttribute("property") === "og:description"
                    ) {
                        ogMeta.description = tag.getAttribute("content");
                    } else if (tag.getAttribute("property") === "og:image") {
                        ogMeta.image = tag.getAttribute("content");
                    }
                }
                setOgData(ogMeta);
            } catch (error) {
                if (retryCount < 3) {
                    // Retry up to 3 times
                    console.log(`Retrying... Attempt ${retryCount + 1}`);
                    setTimeout(() => fetchData(retryCount + 1), 1000);
                } else {
                    console.error("Error fetching OpenGraph data:", error);
                    // setError("Failed to fetch data after several attempts.");
                }
            }
        };

        fetchData();
    }, [url]);

    return (
        <div>
            <h1 className="mb-2">{ogData.title}</h1>
            {/* <p>{ogData.description}</p> */}
            {ogData.image && <img src={ogData.image} alt="Open Graph Image" />}
        </div>
    );
};

export default OpenGraphPreview;
