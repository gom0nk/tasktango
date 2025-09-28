"use client"

import { useState } from "react"
import TodoLoading from "./TodoLoading"
import { Button } from "@/components/ui/button"

export default function LoadingExample() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLoad = () => {
        setIsLoading(true)
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            {isLoading ? (
                <TodoLoading />
            ) : (
                <>
                    <h3 className="text-lg font-semibold">Loading Component Demo</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                        This loading component automatically adapts to your theme (light/dark/system).
                        The monochrome design uses grayscale colors that work well in both themes.
                    </p>
                    <Button onClick={handleLoad}>
                        Start Loading Demo
                    </Button>
                </>
            )}
        </div>
    )
}
