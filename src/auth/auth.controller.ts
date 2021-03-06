import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authSerive : AuthService){}
    @Post('/signup')
    signUp(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto ): Promise<void>{
        return this.authSerive.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
        return this.authSerive.signIn(authCredentialsDto);
    }

}