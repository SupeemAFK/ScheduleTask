import { Board } from '../../boards/models/board.model';
export declare class User {
    id: number;
    email: string;
    name: string;
    avatar: string;
    boards: Board[];
}
