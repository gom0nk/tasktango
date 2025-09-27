"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormMessage } from "@/components/ui/form";

interface PasswordInputProps {
    field: any;
}

export function PasswordInput({ field }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="relative">
            <FormControl>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-background pr-10"
                    {...field}
                />
            </FormControl>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                </span>
            </Button>
            <FormMessage />
        </div>
    );
}
