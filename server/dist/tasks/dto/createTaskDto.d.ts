declare class CreateTaskLinkInput {
    title: string;
    link: string;
}
export declare class CreateTaskDto {
    title: string;
    img: string;
    details: string;
    attachments: string[];
    links: CreateTaskLinkInput[];
    start: Date;
    end: Date;
    allDay: boolean;
    boardId: number;
}
export {};
