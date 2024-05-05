import { Layout, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export const Home: React.FC = () => {
    return (
        <Layout className="min-h-screen">
            <Content className="m-3 bg-white p-3 h-screen">
                <div className="site-layout-content bg-white p-6 rounded shadow h-[50%] flex flex-col items-center">
                    <Text className="text-3xl">Your queues</Text>
                    <div className="my-6">
                        {/* Use any image or SVG here */}
                        <div className="text-center">
                            <p>Empty queue.</p>
                            <p>
                                Looks like you haven't added any new
                                appointments.
                            </p>
                        </div>
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
