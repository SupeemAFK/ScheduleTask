declare class UpdateTaskLinkInput {
    title: string;
    link: string;
}
export declare class UpdateTaskDto {
    id: number;
    title: string;
    img: string;
    details: string;
    attachments: string[];
    links?: UpdateTaskLinkInput[];
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean;
}
export {};
