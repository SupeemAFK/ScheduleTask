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
exports.NotesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const note_model_1 = require("./models/note.model");
const notes_service_1 = require("./notes.service");
const createNoteDto_1 = require("./dto/createNoteDto");
const updateNoteDto_1 = require("./dto/updateNoteDto");
let NotesResolver = exports.NotesResolver = class NotesResolver {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async getNotes() {
        const notes = await this.noteService.getNotes();
        return notes;
    }
    async getNote(id) {
        const note = await this.noteService.getNote(id);
        return note;
    }
    async createNote(createNoteDto) {
        const note = await this.noteService.createNote(createNoteDto);
        return note;
    }
    async updateNote(updateNoteDto) {
        const note = await this.noteService.updateNote(updateNoteDto);
        return note;
    }
    async deleteNote(id) {
        return await this.noteService.deleteNote(id);
    }
    async links(note) {
        return await this.noteService.getNoteLinks(note.id);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [note_model_1.Note]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "getNotes", null);
__decorate([
    (0, graphql_1.Query)(returns => note_model_1.Note),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "getNote", null);
__decorate([
    (0, graphql_1.Mutation)(returns => note_model_1.Note),
    __param(0, (0, graphql_1.Args)('newNoteData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createNoteDto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "createNote", null);
__decorate([
    (0, graphql_1.Mutation)(returns => note_model_1.Note),
    __param(0, (0, graphql_1.Args)('updateNoteData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateNoteDto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "updateNote", null);
__decorate([
    (0, graphql_1.Mutation)(returns => note_model_1.Note),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "deleteNote", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_model_1.Note]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "links", null);
exports.NotesResolver = NotesResolver = __decorate([
    (0, graphql_1.Resolver)(of => note_model_1.Note),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesResolver);
//# sourceMappingURL=notes.resolver.js.map