import { Task } from '../../tasks/models/task.model';
import { User } from '../../users/models/user.model';
import { Note } from 'src/notes/models/note.model';
export declare class Board {
    id: number;
    title: string;
    details: string;
    img: string;
    createdAt: Date;
    notes: Note[];
    tasks: Task[];
    user: User;
}
