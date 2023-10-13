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
exports.Board = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_model_1 = require("../../tasks/models/task.model");
const user_model_1 = require("../../users/models/user.model");
const note_model_1 = require("../../notes/models/note.model");
let Board = exports.Board = class Board {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], Board.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Board.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(type => note_model_1.Note),
    __metadata("design:type", Array)
], Board.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(type => [task_model_1.Task]),
    __metadata("design:type", Array)
], Board.prototype, "tasks", void 0);
__decorate([
    (0, graphql_1.Field)(type => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Board.prototype, "user", void 0);
exports.Board = Board = __decorate([
    (0, graphql_1.ObjectType)()
], Board);
//# sourceMappingURL=board.model.js.map