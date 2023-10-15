import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
class UpdateTaskLinkInput {
    @Field(type => String)
    title: string;

    @Field(type => String)
    link: string;
}

@InputType()
export class UpdateTaskDto {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    img: string;

    @Field(type => String)
    details: string;

    @Field(type => [String])
    attachments: string[];

    @Field(type => [UpdateTaskLinkInput], { nullable: true })
    links?: UpdateTaskLinkInput[];

    @Field(type => Date)
    start: Date;

    @Field(type => Date)
    end: Date;

    @Field(type => Boolean)
    allDay: boolean;

    @Field(type => Boolean)
    completed: boolean;
}