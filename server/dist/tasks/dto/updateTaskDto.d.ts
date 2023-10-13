declare class UpdateTaskLinkInput {
    title: string;
    link: string;
}
export declare class UpdateTaskDto {
    id: number;
    title: string;
    img: string;
    details: string;
    links?: UpdateTaskLinkInput[];
    deadline: Date;
    completed: boolean;
}
export {};
