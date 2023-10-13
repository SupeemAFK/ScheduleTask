import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoardInput';
export declare class BoardsResolver {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    getBoards(): Promise<(import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    })[]>;
    getBoard(id: number): Promise<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }>;
    createBoard(createBoardInput: CreateBoardInput): Promise<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }>;
    updateBoard(updateBoardInput: UpdateBoardInput): Promise<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }>;
    deleteBoard(id: number): Promise<import("@prisma/client").Board & {
        notes: (import("@prisma/client").Note & {
            links: import("@prisma/client").NoteLink[];
        })[];
        tasks: (import("@prisma/client").Task & {
            links: import("@prisma/client").TaskLink[];
        })[];
        user: import("@prisma/client").User;
    }>;
}
