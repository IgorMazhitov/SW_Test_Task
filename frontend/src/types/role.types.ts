/**
 * Role related types and interfaces
 */

/**
 * Represents a role in the system
 */
export interface IRole {
  /** Unique identifier for the role */
  id: number;
  
  /** Name of the role (e.g. "admin", "user") */
  name: string;
}

/**
 * Role create request payload
 */
export interface IRoleCreateRequest {
  name: string;
}

/**
 * Role update request payload
 */
export interface IRoleUpdateRequest {
  id: number;
  name: string;
}

/**
 * Role list response
 */
export interface IRoleListResponse {
  roles: IRole[];
  total: number;
}
