"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Calendar,
    Flag,
    Bell,
    MoreHorizontal,
    ChevronDown,
    Folder
} from "lucide-react";

interface TaskCreationBoxProps {
    children: React.ReactNode;
    onSubmit: (task: {
        name: string;
        description: string;
        date?: string;
        priority?: string;
        reminders?: string;
        project?: string;
    }) => void;
}

export function TaskCreationBox({ children, onSubmit }: TaskCreationBoxProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        priority: "",
        reminders: "",
        project: "Inbox"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: "",
            description: "",
            date: "",
            priority: "",
            reminders: "",
            project: "Inbox"
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="task-name">Task name</Label>
                        <Input
                            id="task-name"
                            placeholder="Task name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="mt-1"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 justify-start"
                            onClick={() => {/* TODO: Implement date picker */ }}
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Date
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 justify-start"
                            onClick={() => {/* TODO: Implement priority picker */ }}
                        >
                            <Flag className="h-4 w-4 mr-2" />
                            Priority
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 justify-start"
                            onClick={() => {/* TODO: Implement reminders */ }}
                        >
                            <Bell className="h-4 w-4 mr-2" />
                            Reminders
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="px-3"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <Folder className="h-4 w-4" />
                                {formData.project}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                Add task
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}