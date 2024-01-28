import Link from "next/link";
import { FC } from "react";
import { Icon } from "./Icon";

interface LogoProps {
    href?: string;
}

export const Logo: FC<LogoProps> = ({ href = "/" }) => {
    return (
        <Link
            href={href}
            className="text-2xl flex gap-4 text-primary uppercase font-medium hover:text-gray"
        >
            <Icon src="favicon" />
            Halyk Life
        </Link>
    );
};
