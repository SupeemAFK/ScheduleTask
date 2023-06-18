import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Board } from '../../boards/models/board.model'

@ObjectType()
export class Todo {
    @Field(type => Int)
    id: number;
  
    @Field(type => String)
    content: string;
    
    @Field(type => Boolean)
    isDone: boolean;

    @Field(type => Date)
    createdAt: Date;

    @Field(type => Board)
    board: Board;
}