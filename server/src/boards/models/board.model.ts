import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Task } from '../../tasks/models/task.model'
import { User } from '../../users/models/user.model'

@ObjectType()
export class Board {
    @Field(type => Int)
    id: number;
  
    @Field(type => String)
    title: string;

    @Field(type => String)
    details: string;

    @Field(type => [String])
    attachments: string[];

    @Field(type => Date)
    createdAt: Date;

    @Field(type => [Task])
    tasks: Task[]

    @Field(type => User)
    user: User
}