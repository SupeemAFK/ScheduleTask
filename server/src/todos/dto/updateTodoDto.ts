import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoDto {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    content: string;
}