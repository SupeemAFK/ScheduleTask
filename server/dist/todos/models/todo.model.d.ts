import { Board } from '../../boards/models/board.model';
export declare class Todo {
    id: number;
    content: string;
    isDone: boolean;
    createdAt: Date;
    board: Board;
}
