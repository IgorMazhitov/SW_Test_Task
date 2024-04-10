import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dtos/create-role.dto";

@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) {}

  @Post('create')
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles()
  }
}
