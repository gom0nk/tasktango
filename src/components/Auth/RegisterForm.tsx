"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "./PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register as registerUser } from "@/lib/auth";

// Register form schema
const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    onSwitchTab: () => void;
}

export function RegisterForm({ onSwitchTab }: RegisterFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Register form
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // Handle registration submission
    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);

        try {
            const result = await registerUser(data.name, data.email, data.password);

            if (result.success) {
                toast.success("Registration successful");
                router.push("/dashboard");
            } else {
                toast.error(result.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration failed", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-border/40 h-full">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your details to register for a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
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
                                    <FormLabel>Password</FormLabel>
                                    <PasswordInput field={field} />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchTab}
                        className="text-primary underline underline-offset-4 hover:text-primary/90"
                    >
                        Login
                    </button>
                </p>
            </CardFooter>
        </Card>
    );
}