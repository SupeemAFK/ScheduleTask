import { Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './models/board.model';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoardInput';

@Resolver(of => Board)
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService){}

    @Query(returns => [Board])
    async getBoards() {
        const boards = await this.boardsService.getBoards();
        return boards
    }

    @Query(returns => Board)
    async getBoard(@Args('id') id: number) {
        const board = await this.boardsService.getBoard(id);
        return board
    }

    @Mutation(returns => Board)
    async createBoard(@Args('newBoardData') createBoardInput: CreateBoardInput) {
        const board = await this.boardsService.createBoard(createBoardInput);
        return board;
    }

    @Mutation(returns => Board)
    async updateBoard(@Args('updateBoardData') updateBoardInput: UpdateBoardInput) {
        const board = await this.boardsService.updateBoard(updateBoardInput);
        return board;
    }

    @Mutation(returns => Board)
    async deleteBoard(@Args('id') id: number) {
        return await this.boardsService.deleteBoard(id)
    }
}
