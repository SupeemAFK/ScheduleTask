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
exports.Task = exports.TaskLink = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_model_1 = require("../../boards/models/board.model");
let TaskLink = exports.TaskLink = class TaskLink {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], TaskLink.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], TaskLink.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], TaskLink.prototype, "link", void 0);
exports.TaskLink = TaskLink = __decorate([
    (0, graphql_1.ObjectType)()
], TaskLink);
let Task = exports.Task = class Task {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Task.prototype, "img", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Task.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(type => [TaskLink]),
    __metadata("design:type", Array)
], Task.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], Task.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)(type => Boolean),
    __metadata("design:type", Boolean)
], Task.prototype, "completed", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(type => board_model_1.Board),
    __metadata("design:type", board_model_1.Board)
], Task.prototype, "board", void 0);
exports.Task = Task = __decorate([
    (0, graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=task.model.js.map