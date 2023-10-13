import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Injectable()
export class TasksService {
    constructor (private readonly prisma: PrismaService){}

    getTasks() {
        return this.prisma.task.findMany({ include: { board: true, links: true } });
    }

    getTask(id: number) {
        return this.prisma.task.findUnique({ where: { id }, include: { board: true, links: true } })
    }

    createTask(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({ 
            data: {
                title: createTaskDto.title,
                details: createTaskDto.details,
                img: createTaskDto.img,
                links: {
                    createMany: { data: createTaskDto.links }
                },
                deadline: createTaskDto.deadline,
                boardId: createTaskDto.boardId
            },
            include: { board: true, links: true }
         })
    }

    async updateTask(updateTaskDto: UpdateTaskDto) {
        if (updateTaskDto?.links) {
            const links = updateTaskDto?.links ? updateTaskDto?.links : [];
            await this.prisma.taskLink.deleteMany({ where: { taskId: updateTaskDto.id }})
            return this.prisma.task.update({ 
                where: {
                    id: updateTaskDto.id
                },
                data: {
                    title: updateTaskDto.title,
                    details: updateTaskDto.details,
                    img: updateTaskDto.img,
                    links: { 
                        createMany: { data: links }
                    },
                    deadline: updateTaskDto.deadline,
                    completed: updateTaskDto.completed
                },
                include: { board: true, links: true }
            })
        }
        else {
            return this.prisma.task.update({ 
                where: {
                    id: updateTaskDto.id
                },
                data: {
                    title: updateTaskDto.title,
                    details: updateTaskDto.details,
                    img: updateTaskDto.img,
                    deadline: updateTaskDto.deadline,
                    completed: updateTaskDto.completed
                },
                include: { board: true, links: true }
            })
        }
    }

    deleteTask(id: number) {
        return this.prisma.task.delete({ where: { id } })
    } 

    getTaskLinks(taskId: number) {
        return this.prisma.taskLink.findMany({ where: { taskId: taskId } })
    }
}
