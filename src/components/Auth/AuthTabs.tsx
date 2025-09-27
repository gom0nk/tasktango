"use client";

import { useEffect, useState, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useRouter, useSearchParams } from "next/navigation";

interface AuthTabsProps {
    defaultTab?: string;
}

function AuthTabsContent({ defaultTab = "login" }: AuthTabsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<string>(defaultTab);

    // Initialize tab from URL parameter on component mount
    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam === "login" || tabParam === "register") {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);

        // Update URL with the new tab parameter
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", value);
        router.push(`/auth?${params.toString()}`);
    };

    const handleSwitchToRegister = () => handleTabChange("register");
    const handleSwitchToLogin = () => handleTabChange("login");

    return (
        <div className="relative">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="transition-all duration-300 cursor-pointer">Login</TabsTrigger>
                    <TabsTrigger value="register" className="transition-all duration-300 cursor-pointer">Register</TabsTrigger>
                </TabsList>

                <div className="relative mt-4 h-[430px]">
                    {/* Login Form */}
                    <div
                        className={`absolute inset-0 w-full transition-all duration-300 ${activeTab === "login"
                            ? "translate-x-0 opacity-100"
                            : "translate-x-[-100%] opacity-0 pointer-events-none"
                            }`}
                    >
                        <LoginForm onSwitchTab={handleSwitchToRegister} />
                    </div>

                    {/* Register Form */}
                    <div
                        className={`absolute inset-0 w-full transition-all duration-300 ${activeTab === "register"
                            ? "translate-x-0 opacity-100"
                            : "translate-x-[100%] opacity-0 pointer-events-none"
                            }`}
                    >
                        <RegisterForm onSwitchTab={handleSwitchToLogin} />
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export function AuthTabs(props: AuthTabsProps) {
    return (
        <Suspense fallback={
            <div className="w-full h-[430px] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <AuthTabsContent {...props} />
        </Suspense>
    );
}