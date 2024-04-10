import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as crypt from 'bcryptjs'
import { User } from 'src/users/database/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}


    async logIn(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email)
        const passwordEquals = await crypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        } 
        throw new UnauthorizedException({
            message: 'Incorrect Email or Password'
        })
    }

    async signUp(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User with this email already existing', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await crypt.hash(userDto.password, 5)
        console.log('step')
        const user = await this.usersService.createUser({
            ...userDto,
            password: hashPassword
        })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            role: user.role
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

}
