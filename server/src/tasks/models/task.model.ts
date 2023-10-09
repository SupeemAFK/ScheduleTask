import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Board } from '../../boards/models/board.model'

@ObjectType()
export class TaskLink {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    link: string;
}

@ObjectType()
export class Task {
    @Field(type => Int)
    id: number;
  
    @Field(type => String)
    title: string;

    @Field(type => String)
    img: string;

    @Field(type => String)
    details: string;

    @Field(type => [TaskLink])
    links: TaskLink[];

    @Field(type => Date)
    deadline: Date;

    @Field(type => Boolean)
    completed: boolean;

    @Field(type => Date)
    createdAt: Date;

    @Field(type => Board)
    board: Board;
}