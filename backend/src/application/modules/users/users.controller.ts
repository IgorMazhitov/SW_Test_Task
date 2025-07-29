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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { ChangeUserDto } from './dtos/change-user.dto';
import { GetAllUsersDto } from './dtos/get-all-users.dto';
import { LoggerInterceptor } from 'src/shared/interceptors/logger.interceptor';
import {
  IUserResponse,
  IPaginatedUsersResponse,
} from '../../../domain/interfaces/user-response.interface';
import { UsersService } from './users.service';

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
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: Object,
    schema: {
      example: {
        id: 1,
        userName: 'John Doe',
        email: 'john.doe@example.com',
        role: {
          id: 1,
          name: 'User',
        },
      },
    },
  })
  async create(@Body() userDto: CreateUserDto): Promise<IUserResponse> {
    return await this.usersService.createUser(userDto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch('/change')
  @ApiTags('Edit User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: Object,
    schema: {
      example: {
        id: 1,
        userName: 'John Doe',
        email: 'john.doe@example.com',
        role: {
          id: 1,
          name: 'User',
        },
      },
    },
  })
  async changeUser(@Body() dto: ChangeUserDto): Promise<IUserResponse> {
    return await this.usersService.changeUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags('Get All Users')
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: Object,
    schema: {
      example: {
        users: [
          {
            id: 1,
            userName: 'John Doe',
            email: 'john.doe@example.com',
            role: {
              id: 1,
              name: 'User',
            },
          },
          {
            id: 2,
            userName: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: {
              id: 1,
              name: 'User',
            },
          },
        ],
        count: 2,
      },
    },
  })
  async getAllUsers(
    @Query('senderId') senderId: number,
    @Query('roleId') roleId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IPaginatedUsersResponse> {
    const request: GetAllUsersDto = {
      senderId,
      roleId,
      page,
      limit,
    };
    return await this.usersService.getAllUsers(request);
  }
}
