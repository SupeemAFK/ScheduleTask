import { Board } from "./board.model";

export interface User {
    id: number;
    username: string;
    email?: string;
    avatar: string;
    boards?: Board[];
}