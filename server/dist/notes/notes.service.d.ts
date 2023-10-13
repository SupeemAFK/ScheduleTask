import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';
export declare class NotesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getNotes(): import("@prisma/client").Prisma.PrismaPromise<(import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    })[]>;
    getNote(id: any): import("@prisma/client").Prisma.Prisma__NoteClient<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }, never>;
    createNote(createNoteDto: CreateNoteDto): import("@prisma/client").Prisma.Prisma__NoteClient<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }, never>;
    updateNote(updateNoteDto: UpdateNoteDto): import("@prisma/client").Prisma.Prisma__NoteClient<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }, never>;
    deleteNote(id: number): import("@prisma/client").Prisma.Prisma__NoteClient<import("@prisma/client").Note, never>;
    getNoteLinks(noteId: number): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").NoteLink[]>;
}
