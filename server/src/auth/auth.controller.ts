import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service'
import { Session } from '@nestjs/common';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('signin')
    async signin(@Session() session: Record<string, any>, @Body() signinDto: SigninDto) {
        const user = await this.authService.signin(signinDto)
        if (user) {
            session.user_id = user.id;
            return "Success"
        }
        else {
            throw new HttpException('Password or Email is wrong', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signup')
    async signup(@Session() session: Record<string, any>, @Body() signupDto: SignupDto) {
        const user = await this.authService.signup(signupDto)
        if (user) {
            session.user_id = user.id;
            return "Success"
        }
        else {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signout')
    signout(@Session() session: Record<string, any>) {
        session.user_id = null
        return "Success"
    }
}
