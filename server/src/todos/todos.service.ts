import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/createTodoDto';
import { UpdateTodoDto } from './dto/updateTodoDto';

@Injectable()
export class TodosService {
    constructor (private readonly prisma: PrismaService){}

    getTodos() {
        return this.prisma.todo.findMany({ include: { board: true } });
    }

    getTodo(id: number) {
        return this.prisma.todo.findUnique({ where: { id }, include: { board: true } })
    }

    createTodo(createTodoDto: CreateTodoDto) {
        return this.prisma.todo.create({ 
            data: {
                content: createTodoDto.content,
                boardId: createTodoDto.boardId
            },
            include: { board: true }
         })
    }

    updateTodo(updateTodoDto: UpdateTodoDto) {
        return this.prisma.todo.update({ 
            where: {
                id: updateTodoDto.id
            },
            data: {
                content: updateTodoDto.content
            },
            include: { board: true }
         })
    }

    deleteTodo(id: number) {
        return this.prisma.todo.delete({ where: { id }, include: { board: true } })
    } 
}
