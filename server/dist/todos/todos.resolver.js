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
exports.TodosResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const todos_service_1 = require("./todos.service");
const todo_model_1 = require("./models/todo.model");
const createTodoDto_1 = require("./dto/createTodoDto");
const updateTodoDto_1 = require("./dto/updateTodoDto");
let TodosResolver = exports.TodosResolver = class TodosResolver {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getTodos() {
        const todos = await this.todoService.getTodos();
        return todos;
    }
    async getTodo(id) {
        const todo = await this.todoService.getTodo(id);
        return todo;
    }
    async createTodo(newTodoData) {
        const todo = await this.todoService.createTodo(newTodoData);
        return todo;
    }
    async updateTodo(updateTodoData) {
        const todo = await this.todoService.updateTodo(updateTodoData);
        return todo;
    }
    async deleteTodo(id) {
        return await this.todoService.deleteTodo(id);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [todo_model_1.Todo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosResolver.prototype, "getTodos", null);
__decorate([
    (0, graphql_1.Query)(returns => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosResolver.prototype, "getTodo", null);
__decorate([
    (0, graphql_1.Mutation)(returns => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('newTodoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTodoDto_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosResolver.prototype, "createTodo", null);
__decorate([
    (0, graphql_1.Mutation)(returns => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('updateTodoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateTodoDto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosResolver.prototype, "updateTodo", null);
__decorate([
    (0, graphql_1.Mutation)(returns => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosResolver.prototype, "deleteTodo", null);
exports.TodosResolver = TodosResolver = __decorate([
    (0, graphql_1.Resolver)(of => todo_model_1.Todo),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosResolver);
//# sourceMappingURL=todos.resolver.js.map