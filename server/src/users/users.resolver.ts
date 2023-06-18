import { Resolver, Query, Context, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDto'
import { User } from './models/user.model'

@Resolver(of => User)
export class UsersResolver {
    constructor (private readonly usersService: UsersService,) {}

    @Query(returns => User)
    async getCurrentUser(@Context() ctx: any) {
        const user = await this.usersService.getUserById(ctx.req.session.user_id)
        return user
    }

    @Query(returns => [User])
    async getUsers() {
        const users = await this.usersService.getUsers()
        return users
    }

    @Query(returns => User)
    async getUserById(@Args('email') id: number) {
        const user = await this.usersService.getUserById(id)
        return user
    }

    @Query(returns => User)
    async getUserByEmail(@Args('email') email: string) {
        const user = await this.usersService.getUserByEmail(email)
        return user
    }

    @Mutation(returns => User)
    async updateUser(@Args('updateUserData') updateUserDto: UpdateUserDto) {
        const user =  await this.usersService.updateUser(updateUserDto)
        return user
    }
}
