import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signin(signinDto: SigninDto) {
        const user = await this.usersService.getUserByEmail(signinDto.email)
        if (user) {
            const compare = await bcrypt.compare(signinDto.password, user.password)
            if (compare) return user
        }
        else {
            return null;
        }
    }

    async signup(signupDto: SignupDto) {
        const user = await this.usersService.getUserByEmail(signupDto.email)
        if (!user) {
            const encryptedPwd = await bcrypt.hash(signupDto.password, 12);
            return this.usersService.createUser({ 
                email: signupDto.email,
                password: encryptedPwd,
                name: signupDto.name,
                avatar: ""
            })
        }
        else {
            return null
        }
    }
}
