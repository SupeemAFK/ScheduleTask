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
exports.Todo = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_model_1 = require("../../boards/models/board.model");
let Todo = exports.Todo = class Todo {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Todo.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(type => Boolean),
    __metadata("design:type", Boolean)
], Todo.prototype, "isDone", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], Todo.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(type => board_model_1.Board),
    __metadata("design:type", board_model_1.Board)
], Todo.prototype, "board", void 0);
exports.Todo = Todo = __decorate([
    (0, graphql_1.ObjectType)()
], Todo);
//# sourceMappingURL=todo.model.js.map