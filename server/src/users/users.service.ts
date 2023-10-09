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

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { email: createUserDto.email } })
        if (user) return null
        if (createUserDto.password) {
            return this.prisma.user.create({ 
                data: { 
                    username: createUserDto.username, 
                    email: createUserDto.email, 
                    password: createUserDto.password,
                    avatar: createUserDto.avatar
                } 
            })
        }
        return this.prisma.user.create({ 
            data: { 
                username: createUserDto.username, 
                email: createUserDto.email, 
                avatar: createUserDto.avatar
            } 
        })
    }

    updateUser(updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({ 
            where: { 
                id: updateUserDto.id 
            }, 
            data: { 
                username: updateUserDto.name,
                avatar: updateUserDto.avatar
            },
            include: { boards: true } 
        })
    }
}
