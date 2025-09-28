
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
};

export type Task = {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    projectId?: string;
};

export type SubTask = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    taskId: string;
    task: Task;
    comments: Comment[];
};

export type Comment = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    taskId: string;
    task: Task;
    subTaskId: string;
    subTask: SubTask;
};