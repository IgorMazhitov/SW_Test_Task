import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/modules/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login', description: 'Endpoint for user login.' })
  async logIn(@Body() userDto: CreateUserDto, @Res() res: any){
    const userData = await this.authService.logIn(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json(userData);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Signup', description: 'Endpoint for user signup.' })
  async signUp(@Body() userDto: CreateUserDto, @Res() res: any) {
    const userData = await this.authService.signUp(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).json(userData);
    return res;
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout', description: 'Endpoint for user logout.' })
  async logOut(@Req() req: any, @Res() res: any){
    const { refreshToken } = req.cookies;
    const token = await this.authService.logOut(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json(token);
  }

  @Get('/refresh')
  @ApiOperation({ summary: 'Refresh', description: 'Endpoint for token refresh.' })
  async refresh(@Req() req: any, @Res() res: any) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(userData);
  }
}
