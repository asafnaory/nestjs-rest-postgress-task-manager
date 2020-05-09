import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositry } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')
    constructor(@InjectRepository(UserRepositry) private userRepositry: UserRepositry, private jwtService : JwtService){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepositry.signUp(authCredentialsDto); 
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
        const username = await this.userRepositry.validateUserPassword(authCredentialsDto);

        if(!username){
            throw new  UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken  = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken };
    }
}
