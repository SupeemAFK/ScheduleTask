import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    details: string;

    @Field(type => String)
    img: string;
}