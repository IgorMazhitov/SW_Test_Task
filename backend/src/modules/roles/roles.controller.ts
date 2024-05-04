import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';

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
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get All Roles',
    description: 'Endpoint to get all roles.',
  })
  @ApiTags('Get All Roles')
  @ApiBearerAuth()
  @Get('all')
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }
}
