declare class UpdateTaskLinkInput {
    id: number;
    title: string;
    link: string;
    taskId: number;
}
export declare class UpdateTaskDto {
    id: number;
    title: string;
    img: string;
    details: string;
    links: UpdateTaskLinkInput[];
    deadline: Date;
    completed: boolean;
}
export {};
