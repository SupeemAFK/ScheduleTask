import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoardInput';

@Injectable()
export class BoardsService {
    constructor(private readonly prisma: PrismaService) {}

    getBoards() {
        return this.prisma.board.findMany({ include: { user: true, todos: true } })
    }

    getBoard(id: number) {
        return this.prisma.board.findUnique({ where: { id }, include: { user: true, todos: true } })
    }

    createBoard(createBoardInput: CreateBoardInput) {
        return this.prisma.board.create({ 
            data: { 
                title: createBoardInput.title,
                img: createBoardInput.img,
                userId: createBoardInput.userId
            },
            include: { user: true, todos: true } 
        })
    }

    updateBoard(updateBoardInput: UpdateBoardInput) {
        return this.prisma.board.update({ 
            where: {
                id: updateBoardInput.id
            },
            data: {
                title: updateBoardInput.title,
                img: updateBoardInput.img
            },
            include: { user: true, todos: true }
         })
    }

    deleteBoard(id: number) {
        return this.prisma.board.delete({ where: { id }, include: { user: true, todos: true } })
    }
}
