import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService) {}

    getUsers() {
        return this.prisma.user.findMany({ include: { boards: true } })
    }

    getUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id }, include: { boards: true } })
    }

    getUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email }, include: { boards: true } })
    }
    
    createUser(createUserDto: CreateUserDto) {
        return this.prisma.user.create({ 
            data: { 
                email: createUserDto.email, 
                name: createUserDto.name, 
                password: createUserDto.password, 
                avatar: "" 
            },
            include: { boards: true } 
        })
    }

    updateUser(updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({ 
            where: { 
                id: updateUserDto.id 
            }, 
            data: { 
                name: updateUserDto.name,
                avatar: updateUserDto.avatar
            },
            include: { boards: true } 
        })
    }
}
