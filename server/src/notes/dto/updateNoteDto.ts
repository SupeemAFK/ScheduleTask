import { InputType, Field, Int } from "@nestjs/graphql";
import { NoteLinkInput } from "../models/note.model";

@InputType()
export class UpdateNoteDto {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    details: string;

    @Field(type => [NoteLinkInput])
    links: NoteLinkInput[];
}