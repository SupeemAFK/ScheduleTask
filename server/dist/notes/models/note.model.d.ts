import { Board } from 'src/boards/models/board.model';
export declare class NoteLinkInput {
    id: number;
    title: string;
    link: string;
    noteId: number;
}
export declare class NoteLink {
    id: number;
    title: string;
    link: string;
}
export declare class Note {
    id: number;
    title: string;
    details: string;
    links: NoteLink[];
    createdAt: Date;
    board: Board;
}
