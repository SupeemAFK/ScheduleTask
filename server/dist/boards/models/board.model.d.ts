import { Task } from '../../tasks/models/task.model';
import { User } from '../../users/models/user.model';
export declare class Board {
    id: number;
    title: string;
    details: string;
    attachments: string[];
    createdAt: Date;
    tasks: Task[];
    user: User;
}
