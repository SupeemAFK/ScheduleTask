declare class CreateTaskLinkInput {
    title: string;
    link: string;
}
export declare class CreateTaskDto {
    title: string;
    img: string;
    details: string;
    links: CreateTaskLinkInput[];
    deadline: Date;
    boardId: number;
}
export {};
