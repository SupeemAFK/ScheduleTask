import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDto';
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
    updateUser(updateUserDto: UpdateUserDto): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
}
