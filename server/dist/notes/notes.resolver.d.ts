import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';
export declare class NotesResolver {
    private noteService;
    constructor(noteService: NotesService);
    getNotes(): Promise<(import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    })[]>;
    getNote(id: number): Promise<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }>;
    createNote(createNoteDto: CreateNoteDto): Promise<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }>;
    updateNote(updateNoteDto: UpdateNoteDto): Promise<import("@prisma/client").Note & {
        links: import("@prisma/client").NoteLink[];
        board: import("@prisma/client").Board;
    }>;
    deleteNote(id: number): Promise<import("@prisma/client").Note>;
}
