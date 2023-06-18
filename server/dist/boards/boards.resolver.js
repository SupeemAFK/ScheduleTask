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
exports.BoardsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const boards_service_1 = require("./boards.service");
const board_model_1 = require("./models/board.model");
const createBoardInput_1 = require("./dto/createBoardInput");
const updateBoardInput_1 = require("./dto/updateBoardInput");
let BoardsResolver = exports.BoardsResolver = class BoardsResolver {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async getBoards() {
        const boards = await this.boardsService.getBoards();
        return boards;
    }
    async getBoard(id) {
        const board = await this.boardsService.getBoard(id);
        return board;
    }
    async createBoard(createBoardInput) {
        const board = await this.boardsService.createBoard(createBoardInput);
        return board;
    }
    async updateBoard(updateBoardInput) {
        const board = await this.boardsService.updateBoard(updateBoardInput);
        return board;
    }
    async deleteBoard(id) {
        return await this.boardsService.deleteBoard(id);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [board_model_1.Board]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "getBoards", null);
__decorate([
    (0, graphql_1.Query)(returns => board_model_1.Board),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "getBoard", null);
__decorate([
    (0, graphql_1.Mutation)(returns => board_model_1.Board),
    __param(0, (0, graphql_1.Args)('newBoardData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBoardInput_1.CreateBoardInput]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "createBoard", null);
__decorate([
    (0, graphql_1.Mutation)(returns => board_model_1.Board),
    __param(0, (0, graphql_1.Args)('updateBoardData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBoardInput_1.UpdateBoardInput]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "updateBoard", null);
__decorate([
    (0, graphql_1.Mutation)(returns => board_model_1.Board),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsResolver.prototype, "deleteBoard", null);
exports.BoardsResolver = BoardsResolver = __decorate([
    (0, graphql_2.Resolver)(of => board_model_1.Board),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsResolver);
//# sourceMappingURL=boards.resolver.js.map