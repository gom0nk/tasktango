import { Task } from "@/type";
import { useState } from "react";
import { toast } from "sonner";

export default function useTask() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const createTask = async (task: Task) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch("/api/v1/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Task creation failed");
            }

            const data = await response.json();
            toast.success("Task created successfully");
            return data;
        }
        catch (error) {
            console.error("Task creation failed", error);
            setError(error as string);
            toast.error("Task creation failed");
        }
        finally {
            setIsLoading(false);
        }
    }

    const getTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch("/api/v1/task", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Task fetching failed");
            }

            const data = await response.json();
            toast.success("Tasks fetched successfully");
            return data;
        }
        catch (error) {
            console.error("Task fetching failed", error);
            setError(error as string);
            toast.error("Task fetching failed");
        }
        finally {
            setIsLoading(false);
        }
    }

    return {
        createTask,
        getTasks,
        isLoading,
        error,
    };

}