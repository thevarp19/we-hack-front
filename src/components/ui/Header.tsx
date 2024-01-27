import clsx from "clsx";
import { Logo } from "../shared/Logo";

export const Header = () => {
    return (
        <header
            className={clsx(
                "flex items-center justify-between max-sm:h-16 h-24 px-5 sm:px-10",
                "border-b border-primary border-opacity-50"
            )}
        >
            <Logo href="/en/home" />
        </header>
    );
};
