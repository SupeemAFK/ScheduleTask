import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class CreateTaskLinkInput {
    @Field(type => String)
    title: string;

    @Field(type => String)
    link: string;
}

@InputType()
export class CreateTaskDto {
    @Field(type => String)
    title: string;

    @Field(type => String)
    img: string;

    @Field(type => String)
    details: string;

    @Field(type => [CreateTaskLinkInput])
    links: CreateTaskLinkInput[];

    @Field(type => Date)
    deadline: Date;

    @Field(type => Int)
    boardId: number;
}