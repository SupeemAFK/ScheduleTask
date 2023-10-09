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
exports.UpdateTaskDto = void 0;
const graphql_1 = require("@nestjs/graphql");
let UpdateTaskLinkInput = class UpdateTaskLinkInput {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateTaskLinkInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], UpdateTaskLinkInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], UpdateTaskLinkInput.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateTaskLinkInput.prototype, "taskId", void 0);
UpdateTaskLinkInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateTaskLinkInput);
let UpdateTaskDto = exports.UpdateTaskDto = class UpdateTaskDto {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateTaskDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "img", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(type => [UpdateTaskLinkInput]),
    __metadata("design:type", Array)
], UpdateTaskDto.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)(type => Boolean),
    __metadata("design:type", Boolean)
], UpdateTaskDto.prototype, "completed", void 0);
exports.UpdateTaskDto = UpdateTaskDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateTaskDto);
//# sourceMappingURL=updateTaskDto.js.map