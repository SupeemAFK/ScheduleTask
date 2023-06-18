import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/createTodoDto';
import { UpdateTodoDto } from './dto/updateTodoDto';
export declare class TodosResolver {
    private readonly todoService;
    constructor(todoService: TodosService);
    getTodos(): Promise<(import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    })[]>;
    getTodo(id: number): Promise<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }>;
    createTodo(newTodoData: CreateTodoDto): Promise<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }>;
    updateTodo(updateTodoData: UpdateTodoDto): Promise<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }>;
    deleteTodo(id: number): Promise<import("@prisma/client").Todo & {
        board: import("@prisma/client").Board;
    }>;
}
