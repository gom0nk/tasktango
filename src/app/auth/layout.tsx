import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TaskTango - Auth",
    description: "Login or register for TaskTango",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
