import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(session: Record<string, any>, signinDto: SigninDto): Promise<string>;
    signup(session: Record<string, any>, signupDto: SignupDto): Promise<string>;
    signout(session: Record<string, any>): string;
}
