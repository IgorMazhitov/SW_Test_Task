import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Not, Repository } from 'typeorm';
import { Role } from 'src/roles/database/role.entity';
import { ChangeUserDto } from './dtos/change-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      let role = null;
      if (dto.roleId) {
        role = await this.rolesRepository.findOne({
          where: {
            id: dto.roleId,
          },
        });
      } else {
        role = await this.rolesRepository.findOne({
          where: {
            name: 'User',
          },
        });
      }
      console.log(role, dto, 'test');
      const user: User = await this.usersRepository.save({
        ...dto,
        role,
      });
      return user;
    } catch (error) {
      throw new Error(`Error during user creation: ${error.message}`);
    }
  }

  async changeUser(dto: ChangeUserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: dto.id,
        },
      });
      const roleToChange = await this.rolesRepository.findOne({
        where: {
          id: dto.roleId,
        },
      });
      if (!user || !roleToChange) {
        throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND);
      }
      const updatedUser = await this.usersRepository.save({
        ...user,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
        role: roleToChange,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error during change user: ${error.message}`);
    }
  }

  async getAllUsers(token) {
    try {
      const user: User = this.jwtService.verify(token);
      let users: User[] = null;
      if (user.role.name === 'Admin') {
        users = await this.usersRepository.find({
          where: {
            id: Not(user.id),
          },
          relations: {
            role: true,
          },
        });
      } else {
        users = await this.usersRepository.find({
          select: ['email', 'userName', 'id'],
          where: {
            id: Not(user.id),
          },
        });
      }
      return users;
    } catch (error) {
      throw new Error(`Error during getting all users: ${error.message}`);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
        relations: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error during get user by email: ${error.message}`);
    }
  }
}
