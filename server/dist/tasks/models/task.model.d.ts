import { Board } from '../../boards/models/board.model';
export declare class TaskLink {
    id: number;
    title: string;
    link: string;
}
export declare class Task {
    id: number;
    title: string;
    img: string;
    details: string;
    attachments: string[];
    links: TaskLink[];
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean;
    createdAt: Date;
    board: Board;
}
