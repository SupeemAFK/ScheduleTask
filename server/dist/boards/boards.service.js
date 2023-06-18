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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BoardsService = exports.BoardsService = class BoardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getBoards() {
        return this.prisma.board.findMany({ include: { user: true, todos: true } });
    }
    getBoard(id) {
        return this.prisma.board.findUnique({ where: { id }, include: { user: true, todos: true } });
    }
    createBoard(createBoardInput) {
        return this.prisma.board.create({
            data: {
                title: createBoardInput.title,
                userId: createBoardInput.userId
            },
            include: { user: true, todos: true }
        });
    }
    updateBoard(updateBoardInput) {
        return this.prisma.board.update({
            where: {
                id: updateBoardInput.id
            },
            data: {
                title: updateBoardInput.title
            },
            include: { user: true, todos: true }
        });
    }
    deleteBoard(id) {
        return this.prisma.board.delete({ where: { id }, include: { user: true, todos: true } });
    }
};
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map