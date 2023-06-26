import { Board } from "./board.model";

export interface User {
    id: number;
    name: string;
    email?: string;
    avatar: string;
    board?: Board[];
}