import Image from "next/image";
import { FC } from "react";

export const NewQueue: FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex flex-row justify-between px-6 py-4 space-x-4 w-full">
                <button className="bg-red-500 px-4 py-2 rounded text-white">
                    Филлиалы
                </button>
            </div>
            <div className="flex flex-col w-full px-6">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white p-4 my-2 rounded-lg shadow"
                    >
                        <div className="flex-grow font-semibold">
                            Touch and Take
                        </div>
                        <Image
                            src="/icons/map.png"
                            width={48}
                            height={48}
                            alt="Logo"
                            className="w-12 h-12"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
