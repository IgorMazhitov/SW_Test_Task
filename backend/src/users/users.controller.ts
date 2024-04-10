import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post('create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
