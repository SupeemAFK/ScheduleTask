import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    name: string;
    
    @Field(type => String)
    avatar: string;
}