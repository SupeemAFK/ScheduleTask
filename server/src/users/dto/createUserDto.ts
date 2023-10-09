import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @Field(type => String)
    email: string;
    @Field(type => String, { nullable: true })
    password?: string;
    @Field(type => String)
    username: string;
    @Field(type => String)
    avatar: string;
}