import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"; // Import Swagger decorators
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";

@ApiTags('Roles') 
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) {}

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Post('create')
  @ApiTags('Create Role') 
  @ApiBearerAuth() 
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Get()
  @ApiTags('Get All Roles') 
  @ApiBearerAuth() 
  getAllRoles() {
    return this.rolesService.getAllRoles()
  }
}
