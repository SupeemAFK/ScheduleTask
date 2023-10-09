import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { CreateUserDto } from './dto/createUserDto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(): import("@prisma/client").Prisma.PrismaPromise<(import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    })[]>;
    getUserById(id: number): import("@prisma/client").Prisma.Prisma__UserClient<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }, never>;
    getUserByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }, never>;
    createUser(createUserDto: CreateUserDto): Promise<import("@prisma/client").User>;
    updateUser(updateUserDto: UpdateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }, never>;
}
