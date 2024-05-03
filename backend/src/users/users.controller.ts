import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ChangeUserDto } from './dtos/change-user.dto';
import { GetAllUsersDto } from './dtos/get-all-users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('create')
  @ApiBearerAuth()
  @ApiTags('Create User')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('/change')
  @ApiTags('Edit User')
  @ApiBearerAuth()
  changeUser(@Body() dto: ChangeUserDto) {
    return this.usersService.changeUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags('Get All Users')
  getAllUsers(
    @Query('senderId') senderId: number,
    @Query('roleId') roleId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const request: GetAllUsersDto = {
      senderId,
      roleId,
      page,
      limit,
    };
    console.log(request);
    return this.usersService.getAllUsers(request);
  }
}
