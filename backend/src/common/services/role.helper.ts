import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleType } from '../../entities/role.entity';
import { BaseService } from '../abstracts/base-service.abstract';

/**
 * Helper service for role-related operations.
 * Centralizes common role retrieval patterns across the application.
 */
@Injectable()
export class RoleHelper extends BaseService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    super();
  }

  /**
   * Retrieves a role by ID
   * @param roleId - The ID of the role to retrieve
   * @returns The role entity
   */
  async getRoleById(roleId: number): Promise<Role> {
    return this.executeWithErrorHandling(
      async () => {
        const role = await this.rolesRepository.findOne({
          where: { id: roleId },
        });

        if (!role) {
          throw new Error(`Role with ID ${roleId} not found`);
        }

        return role;
      },
      `Error retrieving role with ID ${roleId}`
    );
  }

  /**
   * Retrieves a role by name
   * @param roleName - The name of the role to retrieve
   * @returns The role entity
   */
  async getRoleByName(roleName: RoleType): Promise<Role> {
    return this.executeWithErrorHandling(
      async () => {
        const role = await this.rolesRepository.findOne({
          where: { name: roleName },
        });

        if (!role) {
          throw new Error(`Role with name ${roleName} not found`);
        }

        return role;
      },
      `Error retrieving role with name ${roleName}`
    );
  }

  /**
   * Retrieves the default user role
   * @returns The user role entity
   */
  async getUserRole(): Promise<Role> {
    return this.getRoleByName(RoleType.USER);
  }

  /**
   * Retrieves the admin role
   * @returns The admin role entity
   */
  async getAdminRole(): Promise<Role> {
    return this.getRoleByName(RoleType.ADMIN);
  }

  /**
   * Creates a new role
   * @param roleData - Data for the new role
   * @returns The created role
   */
  async createRole(roleData: { name: RoleType }): Promise<Role> {
    return this.executeWithErrorHandling(
      async () => {
        try {
          await this.getRoleByName(roleData.name);
          throw new Error(`Role with name ${roleData.name} already exists`);
        } catch (error) {
          if (!error.message.includes('not found')) {
            throw error;
          }
        }
        
        return await this.rolesRepository.save(roleData);
      },
      'Error creating role'
    );
  }

  /**
   * Retrieves all roles
   * @returns Array of all roles
   */
  async getAllRoles(): Promise<Role[]> {
    return this.executeWithErrorHandling(
      async () => {
        return await this.rolesRepository.find();
      },
      'Error retrieving all roles'
    );
  }
}
