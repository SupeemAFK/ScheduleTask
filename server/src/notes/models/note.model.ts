import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Board } from 'src/boards/models/board.model';

@InputType()
export class NoteLinkInput {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    link: string;
    
    @Field(type => Int)
    noteId: number;
}

@ObjectType()
export class NoteLink {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    link: string;
}

@ObjectType()
export class Note {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    details: string;

    @Field(type => [NoteLink])
    links: NoteLink[];

    @Field(type => Date)
    createdAt: Date;

    @Field(type => Board)
    board: Board;
}