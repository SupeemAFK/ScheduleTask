"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = exports.TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getTasks() {
        return this.prisma.task.findMany({ include: { board: true, links: true } });
    }
    getTask(id) {
        return this.prisma.task.findUnique({ where: { id }, include: { board: true, links: true } });
    }
    createTask(createTaskDto) {
        return this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                details: createTaskDto.details,
                img: createTaskDto.img,
                attachments: createTaskDto.attachments,
                links: {
                    createMany: { data: createTaskDto.links }
                },
                start: createTaskDto.start,
                end: createTaskDto.end,
                allDay: createTaskDto.allDay,
                boardId: createTaskDto.boardId
            },
            include: { board: true, links: true }
        });
    }
    async updateTask(updateTaskDto) {
        if (updateTaskDto?.links) {
            const links = updateTaskDto?.links ? updateTaskDto?.links : [];
            await this.prisma.taskLink.deleteMany({ where: { taskId: updateTaskDto.id } });
            return this.prisma.task.update({
                where: {
                    id: updateTaskDto.id
                },
                data: {
                    title: updateTaskDto.title,
                    details: updateTaskDto.details,
                    img: updateTaskDto.img,
                    attachments: updateTaskDto.attachments,
                    links: {
                        createMany: { data: links }
                    },
                    start: updateTaskDto.start,
                    end: updateTaskDto.end,
                    allDay: updateTaskDto.allDay,
                    completed: updateTaskDto.completed
                },
                include: { board: true, links: true }
            });
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
                    attachments: updateTaskDto.attachments,
                    start: updateTaskDto.start,
                    end: updateTaskDto.end,
                    completed: updateTaskDto.completed
                },
                include: { board: true, links: true }
            });
        }
    }
    deleteTask(id) {
        return this.prisma.task.delete({ where: { id } });
    }
    getTaskLinks(taskId) {
        return this.prisma.taskLink.findMany({ where: { taskId: taskId } });
    }
};
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map