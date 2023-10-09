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
exports.CreateTaskDto = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateTaskLinkInput = class CreateTaskLinkInput {
};
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], CreateTaskLinkInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], CreateTaskLinkInput.prototype, "link", void 0);
CreateTaskLinkInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTaskLinkInput);
let CreateTaskDto = exports.CreateTaskDto = class CreateTaskDto {
};
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "img", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(type => [CreateTaskLinkInput]),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "boardId", void 0);
exports.CreateTaskDto = CreateTaskDto = __decorate([
    (0, graphql_1.InputType)()
], CreateTaskDto);
//# sourceMappingURL=createTaskDto.js.map