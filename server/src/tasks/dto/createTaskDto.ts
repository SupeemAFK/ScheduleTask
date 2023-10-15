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

    @Field(type => [String])
    attachments: string[];

    @Field(type => [CreateTaskLinkInput])
    links: CreateTaskLinkInput[];

    @Field(type => Date)
    start: Date;

    @Field(type => Date)
    end: Date;

    @Field(type => Boolean)
    allDay: boolean;
    
    @Field(type => Int)
    boardId: number;
}