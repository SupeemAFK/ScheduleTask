import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Board } from '../../boards/models/board.model'

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;
  
    @Field(type => String)
    email: string;

    @Field(type => String)
    username: string;

    @Field(type => String)
    avatar: string;

    @Field(type => [Board])
    boards: Board[];
}