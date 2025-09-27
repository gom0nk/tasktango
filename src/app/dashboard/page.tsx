"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlobalSearch } from "@/components/GlobalSearch";
import { getCurrentUser } from "@/lib/auth";
import {
    Search,
    Inbox,
    Calendar,
    Grid3X3,
    CheckCircle,
    Plus,
    ChevronDown,
    ChevronRight,
    Link as LinkIcon,
    RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Get user from localStorage on mount
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen bg-background">
            {/* Global Search */}
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Sidebar */}
            <div className="w-64 bg-muted/50 border-r border-border flex flex-col">
                {/* User Profile */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user?.name || 'Guest'}</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                    </div>
                </div>

                {/* Add Task Button */}
                <div className="p-4">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="h-4 w-4 mr-2" />
                        Add task
                    </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4">
                    <nav className="space-y-1">
                        <div
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="h-4 w-4" />
                            <span>Search</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md bg-primary/10 text-primary cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Inbox className="h-4 w-4" />
                                <span>Inbox</span>
                            </div>
                            <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-1">6</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4" />
                                <span>Today</span>
                            </div>
                            <span className="text-xs text-primary">3</span>
                        </div>

                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                            <Grid3X3 className="h-4 w-4" />
                            <span>Upcoming</span>
                        </div>

                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                            <Grid3X3 className="h-4 w-4" />
                            <span>Filters & Labels</span>
                        </div>

                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                            <CheckCircle className="h-4 w-4" />
                            <span>Completed</span>
                        </div>
                    </nav>

                    {/* My Projects */}
                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">My Projects</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <ChevronRight className="h-4 w-4" />
                                    <span># 15 Day Challenge</span>
                                </div>
                                <span className="text-xs text-muted-foreground">5</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme Toggle */}
                <div className="p-4 border-t border-border">
                    <ThemeToggle />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="border-b border-border p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Inbox</h1>
                        <Button
                            variant="outline"
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <Search className="h-4 w-4" />
                            Search
                            <kbd className="ml-2 px-2 py-1 text-xs bg-muted rounded">⌘K</kbd>
                        </Button>
                    </div>
                </div>

                {/* Task List */}
                <div className="flex-1 p-6">
                    <div className="space-y-0">
                        {/* Task 1 */}
                        <div className="flex items-center gap-3 py-3 border-b border-border">
                            <div className="w-4 h-4 border border-muted-foreground rounded-full"></div>
                            <div className="flex-1">
                                <div className="font-medium">SQL</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-destructive">Yesterday</span>
                                </div>
                            </div>
                        </div>

                        {/* Task 2 */}
                        <div className="flex items-center gap-3 py-3 border-b border-border">
                            <div className="w-4 h-4 border border-muted-foreground rounded-full"></div>
                            <div className="flex-1">
                                <div className="font-medium">GraphQL</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-green-500">Today</span>
                                </div>
                            </div>
                        </div>

                        {/* Task 3 */}
                        <div className="flex items-center gap-3 py-3 border-b border-border">
                            <div className="w-4 h-4 border border-muted-foreground rounded-full"></div>
                            <div className="flex-1">
                                <div className="font-medium">Go</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-destructive">Yesterday 01:00</span>
                                    <RotateCcw className="h-3 w-3" />
                                </div>
                            </div>
                        </div>

                        {/* Task 4 - Expandable */}
                        <div className="flex items-center gap-3 py-3 border-b border-border">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            <div className="w-4 h-4 border border-muted-foreground rounded-full"></div>
                            <div className="flex-1">
                                <div className="font-medium">Prisma</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <LinkIcon className="h-3 w-3" />
                                    <span>0/2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Task Button at Bottom */}
                    <div className="mt-6">
                        <Button variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add task
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}