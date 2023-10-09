interface TaskLink {
    id: number;
    title: string;
    link: string;
}

export interface Task {
    id: number;
    title: string;
    details: string;
    img: string;
    links: TaskLink[]
    deadline: Date;
    completed: boolean
    createdAt: Date;
}