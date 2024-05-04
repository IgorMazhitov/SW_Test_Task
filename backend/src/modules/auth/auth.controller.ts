import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login', description: 'Endpoint for user login.' })
  logIn(@Body() userDto: CreateUserDto) {
    return this.authService.logIn(userDto);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Signup', description: 'Endpoint for user signup.' })
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
