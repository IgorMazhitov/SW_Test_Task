import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/modules/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

const DAYS_IN_MONTH = 30;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const COOKIE_MAX_AGE =
  DAYS_IN_MONTH *
  HOURS_IN_DAY *
  MINUTES_IN_HOUR *
  SECONDS_IN_MINUTE *
  MILLISECONDS_IN_SECOND;

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  private readonly maxAge = COOKIE_MAX_AGE;

  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login', description: 'Endpoint for user login.' })
  async logIn(@Body() userDto: CreateUserDto, @Res() res: any) {
    const userData = await this.authService.logIn(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: this.maxAge,
      httpOnly: true,
    });
    res.status(HttpStatus.OK).json(userData);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Signup', description: 'Endpoint for user signup.' })
  async signUp(@Body() userDto: CreateUserDto, @Res() res: any) {
    const userData = await this.authService.signUp(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: this.maxAge,
      httpOnly: true,
    });
    res.status(HttpStatus.CREATED).json(userData);
    return res;
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout', description: 'Endpoint for user logout.' })
  async logOut(@Req() req: any, @Res() res: any) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logOut(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(HttpStatus.OK).json(token);
  }

  @Get('/refresh')
  @ApiOperation({
    summary: 'Refresh',
    description: 'Endpoint for token refresh.',
  })
  async refresh(@Req() req: any, @Res() res: any) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: this.maxAge,
      httpOnly: true,
    });
    return res.status(HttpStatus.OK).json(userData);
  }
}
