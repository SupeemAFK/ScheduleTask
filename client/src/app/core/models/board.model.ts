import { User } from "./user.model";
import { Task } from "./task.model";

export interface Board {
    id: number;
    img: string;
    title: string;
    createdAt: Date;
    user: User;
    tasks: Task[];
}