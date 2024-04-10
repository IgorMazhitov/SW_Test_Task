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
    const role: Role = await this.rolesRepository.save(dto)
    return role
  }

  async getAllRoles() {
    const roles: Role[] = await this.rolesRepository.find()
    return roles
  }
}
