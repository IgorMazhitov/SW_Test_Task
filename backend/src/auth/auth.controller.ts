import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/login')
    logIn(@Body() userDto: CreateUserDto) {
        return this.authService.logIn(userDto)
    }

    @Post('/signup')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto)
    }
}
