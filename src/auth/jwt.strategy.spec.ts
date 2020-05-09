import {JwtStrategy} from './jwt.strategy';
import { Test } from '@nestjs/testing'
import {UserRepositry} from './user.repository'
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';


const mockUserRepository = () => ({
    findOne : jest.fn()
})
describe('JwtStrategy', ()=>{
    let jwtStrategy: JwtStrategy; 
    let userRepositry; 

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[
                JwtStrategy,
                {provide:UserRepositry , useFactory: mockUserRepository}
            ]
        }).compile()

        jwtStrategy = await module.get<JwtStrategy>(JwtStrategy); 
        userRepositry = await module.get<UserRepositry>(UserRepositry); 
    })
    describe('validate', ()=>{
        it('validate and returns the user based on JWT payload',async ()=>{
            const user = new User(); 
            user.username = 'TestUser';

            userRepositry.findOne.mockResolvedValue(user); 
            const result = await jwtStrategy.validate({username: 'TestUser'}); 
            expect(userRepositry.findOne).toHaveBeenCalledWith({username: 'TestUser'});
            expect(result).toEqual(user);
        })
        it('throws an unathorized exeption as user can not be found ', ()=>{
            userRepositry.findOne.mockResolvedValue(null); 
            expect(jwtStrategy.validate({username: 'TestUser'})).rejects.toThrow(UnauthorizedException)
        })
    })
})