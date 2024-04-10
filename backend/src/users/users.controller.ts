import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ChangeUserDto } from "./dtos/change-user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Post('create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Post('role')
  changeUser(@Body() dto: ChangeUserDto) {
    return this.usersService.changeUser(dto)
  }

  @UseGuards(RolesGuard)
  @Roles("Admin")
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
