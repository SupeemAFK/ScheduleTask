import { NoteLinkInput } from "../models/note.model";
export declare class UpdateNoteDto {
    id: number;
    title: string;
    details: string;
    links: NoteLinkInput[];
}
