import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './database/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async createRole(dto: CreateRoleDto) {
    const user: Role = await this.rolesRepository.save(dto)
    return user
  }

  async getAllUsers() {
    const users: Role[] = await this.rolesRepository.find()
    return users
  }
}
