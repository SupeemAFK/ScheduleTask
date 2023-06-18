import { Todo } from '../../todos/models/todo.model';
import { User } from '../../users/models/user.model';
export declare class Board {
    id: number;
    title: string;
    createdAt: Date;
    todos: Todo[];
    user: User;
}
