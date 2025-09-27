"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    title: string;
    description?: string;
    type: "page" | "component" | "action";
    href?: string;
}

const mockSearchResults: SearchResult[] = [
    {
        id: "1",
        title: "Dashboard",
        description: "Main dashboard overview",
        type: "page",
        href: "/dashboard"
    },
    {
        id: "2",
        title: "Tasks",
        description: "Manage your tasks",
        type: "page",
        href: "/tasks"
    },
    {
        id: "3",
        title: "Projects",
        description: "Project management",
        type: "page",
        href: "/projects"
    },
    {
        id: "4",
        title: "Settings",
        description: "Application settings",
        type: "page",
        href: "/settings"
    },
    {
        id: "5",
        title: "Profile",
        description: "User profile management",
        type: "page",
        href: "/profile"
    },
    {
        id: "6",
        title: "Add Task",
        description: "Create a new task",
        type: "action",
        href: "/dashboard?action=add-task"
    },
    {
        id: "7",
        title: "Create Project",
        description: "Start a new project",
        type: "action",
        href: "/projects?action=create"
    }
];

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === "") {
            setResults(mockSearchResults);
        } else {
            const filtered = mockSearchResults.filter(result =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description?.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        }
        setSelectedIndex(0);
    }, [query]);

    const handleResultClick = useCallback((result: SearchResult) => {
        if (result.href) {
            window.location.href = result.href;
        }
        onClose();
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleResultClick(results[selectedIndex]);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose, handleResultClick]);

    const pages = results.filter(r => r.type === "page");
    const actions = results.filter(r => r.type === "action");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-background border border-border rounded-lg shadow-2xl">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-border">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘K</kbd>
                    </div>

                    {/* Search Results */}
                    <div className="max-h-96 overflow-y-auto">
                        {pages.length > 0 && (
                            <div className="p-2">
                                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Pages
                                </div>
                                {pages.map((result, index) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleResultClick(result)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-accent transition-colors",
                                            selectedIndex === index && "bg-accent"
                                        )}
                                    >
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex-1">
                                            <div className="font-medium">{result.title}</div>
                                            {result.description && (
                                                <div className="text-sm text-muted-foreground">{result.description}</div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {actions.length > 0 && (
                            <div className="p-2 border-t border-border">
                                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Actions
                                </div>
                                {actions.map((result, index) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleResultClick(result)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-accent transition-colors",
                                            selectedIndex === pages.length + index && "bg-accent"
                                        )}
                                    >
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex-1">
                                            <div className="font-medium">{result.title}</div>
                                            {result.description && (
                                                <div className="text-sm text-muted-foreground">{result.description}</div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {results.length === 0 && query && (
                            <div className="p-8 text-center text-muted-foreground">
                                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No results found for "{query}"</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-border bg-muted/30">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                                <span>Esc Close</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                <span>Go to Page</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}