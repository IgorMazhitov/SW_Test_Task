import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"; // Import Swagger decorators
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ChangeUserDto } from "./dtos/change-user.dto";
import { LoggerInterceptor } from "src/interceptors/logger.interceptor";

@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Post('create')
  @UseInterceptors(LoggerInterceptor)
  @ApiTags('Create User') 
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Post('role')
  @ApiTags('Edit User') 
  changeUser(@Body() dto: ChangeUserDto) {
    return this.usersService.changeUser(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('get')
  @ApiBearerAuth() 
  @ApiTags('Get All Users') 
  getAllUsers(@Req() req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.usersService.getAllUsers(token);
  }
}
