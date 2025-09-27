
export type User = {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
};

export type Project = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
    tasks: Task[];
};

export type Task = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
    project: Project;
    subTasks: SubTask[];
    comments: Comment[];
};

export type SubTask = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    taskId: string;
    task: Task;
    comments: Comment[];
};

export type Comment = {
    content: string;
    createdAt: Date;
    updatedAt: Date;
    taskId: string;
    task: Task;
    subTaskId: string;
    subTask: SubTask;
};