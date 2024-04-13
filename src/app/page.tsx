"use client";
import { Logo } from "@/components/shared/Logo";
import { Button } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center flex-col ">
            <motion.div
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 1.5,
                        delay: 0.2,
                        ease: "easeInOut",
                    },
                }}
                initial={{ opacity: 0, scale: 0.5 }}
            >
                <div className="flex flex-col gap-5">
                    <Logo href="#" />
                    <Link href="/en/home">
                        <Button
                            type="primary"
                            size="large"
                            className="w-full bg-indigo-600"
                        >
                            Get started
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
