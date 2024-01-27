import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["var(--font-roboto)"],
            },
        },
        colors: {
            white: "white",
            black: "black",
            primary: "var(--color-primary)",
            gray: "var(--color-bg-gray)",
            yellow: "var(--color-yellow)",
        },
    },
    plugins: [],
};
export default config;
