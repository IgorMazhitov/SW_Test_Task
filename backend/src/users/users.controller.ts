import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ChangeUserDto } from './dtos/change-user.dto';
import { GetAllUsersDto } from './dtos/get-all-users.dto';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(LoggerInterceptor)
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
  @Patch('/change')
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
    return this.usersService.getAllUsers(request);
  }
}
