import Link from "next/link";
import { FC } from "react";

interface LogoProps {}

export const Logo: FC<LogoProps> = ({}) => {
    return <Link href={"/"}>BEXENDA</Link>;
};
