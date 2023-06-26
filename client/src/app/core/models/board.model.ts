import { User } from "./user.model";
import { Todo } from "./todo.model";

export interface Board {
    id: number;
    img: string;
    title: string;
    createdAt: Date;
    user: User;
    todos: Todo[];
}