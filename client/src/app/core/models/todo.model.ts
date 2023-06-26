import { Board } from "./board.model";

export interface Todo {
    id: number;
    content: string;
    idDone: boolean
    createdAt: Date;
    board: Board;
}