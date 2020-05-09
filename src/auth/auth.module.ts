import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositry } from './user.repository';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'

const jwtConfig = config.get('jwt'); 
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions:{
                expiresIn: jwtConfig.expiersIn,
            },
        }),
        TypeOrmModule.forFeature([UserRepositry])
    ],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
