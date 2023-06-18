import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signin(signinDto: SigninDto): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
    signup(signupDto: SignupDto): Promise<import("@prisma/client").User & {
        boards: import("@prisma/client").Board[];
    }>;
}
