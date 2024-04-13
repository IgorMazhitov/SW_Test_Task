import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"; // Import Swagger decorators
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('Roles') 
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) {}

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @ApiTags('Create Role') 
  @ApiBearerAuth() 
  @Post('create')
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Get All Roles') 
  @ApiBearerAuth() 
  @Get('all')
  getAllRoles() {
    console.log('roles getting')
    return this.rolesService.getAllRoles()
  }
}
