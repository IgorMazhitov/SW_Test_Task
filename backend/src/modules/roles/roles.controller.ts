import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { IRoleResponse, IRolesListResponse } from './interfaces/role-response.interface';
import { RoleType } from '../../entities/role.entity';

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
        created_at: new Date()
      }
    }
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
            created_at: new Date()
          },
          {
            id: 2,
            name: RoleType.USER,
            created_at: new Date()
          }
        ]
      }
    }
  })
  async getAllRoles(): Promise<IRolesListResponse> {
    return await this.rolesService.getAllRoles();
  }
}
