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
    links: TaskLink[];
    deadline: Date;
    completed: boolean;
    createdAt: Date;
    board: Board;
}
