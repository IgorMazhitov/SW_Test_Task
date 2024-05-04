import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    try {
      const role: Role = await this.rolesRepository.save(dto);
      return role;
    } catch (error) {
      throw new Error(`Error during role creation: ${error.message}`);
    }
  }

  async getAllRoles() {
    try {
      const roles: Role[] = await this.rolesRepository.find();
      return roles;
    } catch (error) {
      throw new Error(`Error during role creation: ${error.message}`);
    }
  }
}
