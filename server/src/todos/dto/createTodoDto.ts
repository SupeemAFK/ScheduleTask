import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTodoDto {
    @Field(type => String)
    content: string;

    @Field(type => Int)
    boardId: number;
}