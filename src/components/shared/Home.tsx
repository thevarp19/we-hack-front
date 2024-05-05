"use client";
import { SearchByINN } from "@/modules/search/components/SearchByINN";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    ThunderboltOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Layout, Spin, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export const Home: React.FC = () => {
    const [bookings, setBookings] = useState([{}, {}]);
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
                        {/* Use any image or SVG here */}
                        {loading && <Spin />}
                        {bookings.length === 0 && !loading && (
                            <div className="text-center">
                                <p>Пусто</p>
                                <p>Похоже, вы не добавили новых записей.</p>
                            </div>
                        )}
                        {bookings.length > 0 && !loading && (
                            <div className="">
                                <p className="text-center mb-4">
                                    У вас {bookings.length} записей
                                </p>
                                <ul className="flex flex-col gap-4">
                                    {bookings.map((booking, index) => (
                                        <li key={index} className="max-w-sm">
                                            <Card
                                                title={"Обновить паспорт"}
                                                extra={
                                                    <span>
                                                        <ThunderboltOutlined />{" "}
                                                        Живая очередь
                                                    </span>
                                                }
                                                style={{
                                                    width: "min(calc(100vw - 20px), 384px)",
                                                }}
                                            >
                                                <div className="flex items-center gap-4 text-xl">
                                                    <UserOutlined />
                                                    Впереди 7 человек
                                                </div>
                                                <div className="flex items-center gap-4 text-xl">
                                                    <ClockCircleOutlined />
                                                    Ожидаемое время 14:00 <br />
                                                    (15 минут)
                                                </div>
                                            </Card>
                                            <Card
                                                title={"Обновить паспорт"}
                                                extra={
                                                    <span>
                                                        <CheckCircleOutlined />{" "}
                                                        Забронированный
                                                    </span>
                                                }
                                                style={{
                                                    width: "min(calc(100vw - 20px), 384px)",
                                                }}
                                            >
                                                <div className="flex items-center gap-4 text-xl">
                                                    <HomeOutlined />
                                                    Окошка № 3
                                                </div>
                                                <div className="flex items-center gap-4 text-xl">
                                                    <ClockCircleOutlined />
                                                    Время консультатции 14:00{" "}
                                                    <br />
                                                    17 марта
                                                </div>
                                                <OpenGraphPreview url="https://2gis.kz/almaty/geo/9430073144770622" />
                                            </Card>
                                        </li>
                                    ))}
                                </ul>
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
                <Image
                    src="/icons/queue.png"
                    width={30}
                    height={30}
                    alt="aaa"
                />
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
        const fetchData = async () => {
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
                console.error("Error fetching OpenGraph data:", error);
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
