import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoardInput';
export declare class BoardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBoards(): import("@prisma/client").Prisma.PrismaPromise<(import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    })[]>;
    getBoard(id: number): import("@prisma/client").Prisma.Prisma__BoardClient<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }, never>;
    createBoard(createBoardInput: CreateBoardInput): import("@prisma/client").Prisma.Prisma__BoardClient<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }, never>;
    updateBoard(updateBoardInput: UpdateBoardInput): import("@prisma/client").Prisma.Prisma__BoardClient<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }, never>;
    deleteBoard(id: number): import("@prisma/client").Prisma.Prisma__BoardClient<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }, never>;
}
