import { ReactNode } from "react";

export default function HomeLayout({ children }: { children?: ReactNode }) {
    return (
        // <AuthProvider>
        <div>{children}</div>
        // </AuthProvider>
    );
}
