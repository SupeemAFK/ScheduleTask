import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { CreateUserDto } from './dto/createUserDto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    getCurrentUser(ctx: any): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
    getUsers(): Promise<(import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    })[]>;
    getUserById(id: number): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
    getUserByEmail(email: string): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
    createUser(createUserDto: CreateUserDto): Promise<import("@prisma/client").User>;
    updateUser(updateUserDto: UpdateUserDto): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
}
