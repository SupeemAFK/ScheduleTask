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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tasks_service_1 = require("./tasks.service");
const task_model_1 = require("./models/task.model");
const createTaskDto_1 = require("./dto/createTaskDto");
const updateTaskDto_1 = require("./dto/updateTaskDto");
let TasksResolver = exports.TasksResolver = class TasksResolver {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getTasks() {
        const tasks = await this.taskService.getTasks();
        return tasks;
    }
    async getTask(id) {
        const tasks = await this.taskService.getTask(id);
        return tasks;
    }
    async createTask(newTaskData) {
        const tasks = await this.taskService.createTask(newTaskData);
        return tasks;
    }
    async updateTask(updateTaskData) {
        const tasks = await this.taskService.updateTask(updateTaskData);
        return tasks;
    }
    async deleteTask(id) {
        return await this.taskService.deleteTask(id);
    }
    async links(task) {
        return await this.taskService.getTaskLinks(task.id);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [task_model_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "getTasks", null);
__decorate([
    (0, graphql_1.Query)(returns => task_model_1.Task),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "getTask", null);
__decorate([
    (0, graphql_1.Mutation)(returns => task_model_1.Task),
    __param(0, (0, graphql_1.Args)('newTodoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTaskDto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Mutation)(returns => task_model_1.Task),
    __param(0, (0, graphql_1.Args)('updateTodoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateTaskDto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "updateTask", null);
__decorate([
    (0, graphql_1.Mutation)(returns => task_model_1.Task),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "deleteTask", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_model_1.Task]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "links", null);
exports.TasksResolver = TasksResolver = __decorate([
    (0, graphql_1.Resolver)(of => task_model_1.Task),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksResolver);
//# sourceMappingURL=tasks.resolver.js.map