import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
export declare class TasksResolver {
    private readonly taskService;
    constructor(taskService: TasksService);
    getTasks(): Promise<(import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    })[]>;
    getTask(id: number): Promise<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }>;
    createTask(newTaskData: CreateTaskDto): Promise<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }>;
    updateTask(updateTaskData: UpdateTaskDto): Promise<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }>;
    deleteTask(id: number): Promise<import("@prisma/client").Task>;
}
