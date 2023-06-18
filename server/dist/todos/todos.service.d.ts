import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/createTodoDto';
import { UpdateTodoDto } from './dto/updateTodoDto';
export declare class TodosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTodos(): import("@prisma/client").Prisma.PrismaPromise<(import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    })[]>;
    getTodo(id: number): import("@prisma/client").Prisma.Prisma__TodoClient<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }, never>;
    createTodo(createTodoDto: CreateTodoDto): import("@prisma/client").Prisma.Prisma__TodoClient<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }, never>;
    updateTodo(updateTodoDto: UpdateTodoDto): import("@prisma/client").Prisma.Prisma__TodoClient<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }, never>;
    deleteTodo(id: number): import("@prisma/client").Prisma.Prisma__TodoClient<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }, never>;
}
