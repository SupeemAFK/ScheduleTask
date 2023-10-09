import { NoteLinkInput } from "../models/note.model";
export declare class CreateNoteDto {
    title: string;
    details: string;
    links: NoteLinkInput[];
    boardId: number;
}
