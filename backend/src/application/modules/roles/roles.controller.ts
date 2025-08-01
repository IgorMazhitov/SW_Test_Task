import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { LoggerInterceptor } from 'src/shared/interceptors/logger.interceptor';
import {
  IRoleResponse,
  IRolesListResponse,
} from '../../../domain/interfaces/role-response.interface';
import { RolesService } from './roles.service';
import { RoleType } from 'src/domain/entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({
    summary: 'Create Role',
    description: 'Endpoint to create a new role.',
  })
  @ApiTags('Create Role')
  @ApiBearerAuth()
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: Object,
    schema: {
      example: {
        id: 1,
        name: RoleType.ADMIN,
        createdAt: new Date(),
      },
    },
  })
  async createRole(@Body() roleDto: CreateRoleDto): Promise<IRoleResponse> {
    return await this.rolesService.createRole(roleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get All Roles',
    description: 'Endpoint to get all roles.',
  })
  @ApiTags('Get All Roles')
  @ApiBearerAuth()
  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'Roles retrieved successfully',
    type: Object,
    schema: {
      example: {
        roles: [
          {
            id: 1,
            name: RoleType.ADMIN,
            createdAt: new Date(),
          },
          {
            id: 2,
            name: RoleType.USER,
            createdAt: new Date(),
          },
        ],
      },
    },
  })
  async getAllRoles(): Promise<IRolesListResponse> {
    return await this.rolesService.getAllRoles();
  }
}
