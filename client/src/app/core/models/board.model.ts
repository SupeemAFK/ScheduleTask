import { User } from "./user.model";
import { Task } from "./task.model";

export interface Board {
    id: number;
    title: string;
    details: string;
    attachments: { name: string; download_url: string }[];
    createdAt: Date;
    user: User;
    tasks: Task[];
}