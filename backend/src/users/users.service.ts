import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/database/role.entity';
import { ChangeRoleDto } from './dtos/change-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.rolesRepository.findOne({
        where: {
            name: 'User'
        }
    })
    const user: User = await this.usersRepository.save({
        ...dto,
        role
    })
    return user
  }

  async getAllUsers() {
    const users: User[] = await this.usersRepository.find({
        relations: {
            role: true
        }
    })
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
        where: {
            email
        },
        relations: {
            role: true
        }
    })
    return user
  }

  async changeUsersRole(dto: ChangeRoleDto) {
    const user = await this.usersRepository.findOne({
        where: {
            id: dto.id
        }
    })
    const roleToChange = await this.rolesRepository.findOne({
        where: {
            name: dto.role
        }
    })
    if (roleToChange && user) {
        await this.usersRepository.save({
            ...user,
            role: roleToChange
        })
        return dto
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND)
  }
}
