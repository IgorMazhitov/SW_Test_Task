import { Injectable } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { BaseService } from '../../abstracts/base-service.abstract';
import { RoleHelper } from '../../helpers/role.helper';
import { IRoleResponse, IRolesListResponse } from '../../../domain/interfaces/role-response.interface';

@Injectable()
export class RolesService extends BaseService {
  constructor(private readonly roleHelper: RoleHelper) {
    super();
  }

  /**
   * Creates a new role
   * @param dto - Role data for creation
   * @returns The created role
   */
  async createRole(dto: CreateRoleDto): Promise<IRoleResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const role = await this.roleHelper.createRole(dto);
        return {
          id: role.id,
          name: role.name,
          created_at: role.created_at
        };
      },
      'Error creating role'
    );
  }

  /**
   * Retrieves all roles
   * @returns Array of all roles
   */
  async getAllRoles(): Promise<IRolesListResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const roles = await this.roleHelper.getAllRoles();
        return {
          roles: roles.map(role => ({
            id: role.id,
            name: role.name,
            created_at: role.created_at
          }))
        };
      },
      'Error retrieving all roles'
    );
  }
}
