import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
    @Field(type => String)
    title: string;

    @Field(type => String)
    details: string;

    @Field(type => [String])
    attachments: string[];

    @Field(type => Int)
    userId: number;
}