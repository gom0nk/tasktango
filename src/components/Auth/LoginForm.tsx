"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { PasswordInput } from "./PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/lib/auth";

// Login form schema
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSwitchTab: () => void;
}

export function LoginForm({ onSwitchTab }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Login form
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle login submission
    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);

        try {
            const result = await login(data.email, data.password);

            if (result.success) {
                toast.success("Login successful");
                router.push("/dashboard");
            } else {
                toast.error(result.error || "Login failed");
            }
        } catch (error) {
            console.error("Login failed", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-border/40 h-auto">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            className="bg-background"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput field={field} />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchTab}
                        className="text-primary underline underline-offset-4 hover:text-primary/90"
                    >
                        Register
                    </button>
                </p>
            </CardFooter>
        </Card>
    );
}