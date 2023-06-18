import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Todo } from '../../todos/models/todo.model'
import { User } from '../../users/models/user.model'

@ObjectType()
export class Board {
    @Field(type => Int)
    id: number;
  
    @Field(type => String)
    title: string;

    @Field(type => Date)
    createdAt: Date;

    @Field(type => [Todo])
    todos: Todo[]

    @Field(type => User)
    user: User
}