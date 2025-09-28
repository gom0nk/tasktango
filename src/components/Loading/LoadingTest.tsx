"use client"

import { useState, useEffect } from "react"
import TodoLoading from "./TodoLoading"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function LoadingTest() {
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useTheme()

    const handleLoad = () => {
        setIsLoading(true)
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }

    useEffect(() => {
        console.log('Current theme:', theme)
    }, [theme])

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Loading Component Test</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Current theme: <span className="font-mono">{theme}</span>
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center gap-4">
                    <TodoLoading />
                    <p className="text-sm text-muted-foreground">
                        This should show monochrome colors (grays) instead of blue
                    </p>
                </div>
            ) : (
                <Button onClick={handleLoad}>
                    Test Monochrome Loading
                </Button>
            )}

            <div className="mt-4 text-xs text-muted-foreground text-center max-w-md">
                The loading component should display in monochrome (grayscale) colors
                that adapt to your current theme (light/dark).
            </div>
        </div>
    )
}
