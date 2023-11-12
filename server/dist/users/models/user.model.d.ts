import { Board } from '../../boards/models/board.model';
export declare class User {
    id: number;
    email: string;
    username: string;
    avatar: string;
    boards: Board[];
}
