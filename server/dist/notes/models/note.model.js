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
exports.Note = exports.NoteLink = exports.NoteLinkInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_model_1 = require("../../boards/models/board.model");
let NoteLinkInput = exports.NoteLinkInput = class NoteLinkInput {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], NoteLinkInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], NoteLinkInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], NoteLinkInput.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], NoteLinkInput.prototype, "noteId", void 0);
exports.NoteLinkInput = NoteLinkInput = __decorate([
    (0, graphql_1.InputType)()
], NoteLinkInput);
let NoteLink = exports.NoteLink = class NoteLink {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], NoteLink.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], NoteLink.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], NoteLink.prototype, "link", void 0);
exports.NoteLink = NoteLink = __decorate([
    (0, graphql_1.ObjectType)()
], NoteLink);
let Note = exports.Note = class Note {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(type => String),
    __metadata("design:type", String)
], Note.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(type => [NoteLink]),
    __metadata("design:type", Array)
], Note.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(type => board_model_1.Board),
    __metadata("design:type", board_model_1.Board)
], Note.prototype, "board", void 0);
exports.Note = Note = __decorate([
    (0, graphql_1.ObjectType)()
], Note);
//# sourceMappingURL=note.model.js.map