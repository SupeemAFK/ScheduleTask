import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTasks(): import("@prisma/client").Prisma.PrismaPromise<(import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    })[]>;
    getTask(id: number): import("@prisma/client").Prisma.Prisma__TaskClient<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }, never>;
    createTask(createTaskDto: CreateTaskDto): import("@prisma/client").Prisma.Prisma__TaskClient<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }, never>;
    updateTask(updateTaskDto: UpdateTaskDto): Promise<import("@prisma/client").Task & {
        links: import("@prisma/client").TaskLink[];
        board: import("@prisma/client").Board;
    }>;
    deleteTask(id: number): import("@prisma/client").Prisma.Prisma__TaskClient<import("@prisma/client").Task, never>;
    getTaskLinks(taskId: number): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").TaskLink[]>;
}
