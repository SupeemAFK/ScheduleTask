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

    @Field(type => [UpdateTaskLinkInput], { nullable: true })
    links?: UpdateTaskLinkInput[];

    @Field(type => Date)
    deadline: Date;

    @Field(type => Boolean)
    completed: boolean;
}