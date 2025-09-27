"use client";

import { Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthTabs } from "@/components/Auth/AuthTabs";
import { useSearchParams } from "next/navigation";

function AuthContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "login";

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background px-4 sm:px-6">
      {/* Theme Toggle Button - Positioned in top-right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">TaskTango</h1>
          <p className="text-muted-foreground mt-2">Manage your tasks efficiently</p>
        </div>

        <AuthTabs defaultTab={tabParam === "register" ? "register" : "login"} />
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}