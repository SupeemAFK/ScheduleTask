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
    attachments: { name: string; download_url: string }[];
    links: TaskLink[]
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean
    createdAt: Date;
}