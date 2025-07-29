import { RoleType } from '../entities/role.entity';

/**
 * Interface for role response objects
 */
export interface IRoleResponse {
  id: number;
  name: RoleType;
  createdAt: Date;
}

/**
 * Interface for multiple roles response
 */
export interface IRolesListResponse {
  roles: IRoleResponse[];
}
