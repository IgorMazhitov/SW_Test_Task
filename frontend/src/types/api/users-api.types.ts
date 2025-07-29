/**
 * Types for User API interactions
 */
import { IUser } from '../user.types';

/**
 * Response for get all users API call
 */
export interface GetAllUsersResponse {
  /** List of users */
  users: IUser[];
  
  /** Total count of users */
  count: number;
}

/**
 * DTO for creating a new user
 */
export interface UserCreationDto {
  /** Username for the new user */
  userName: string;
  
  /** Email for the new user */
  email: string;
  
  /** Password for the new user */
  password: string;
  
  /** Role ID for the new user */
  roleId: number;
}

/**
 * DTO for updating an existing user
 */
export interface ChangeUserDto {
  /** User ID */
  id: number;
  
  /** Updated username */
  userName: string;
  
  /** Updated email */
  email: string;
  
  /** Updated password (leave empty to keep current password) */
  password: string;
  
  /** Updated role ID */
  roleId: number;
}

/**
 * DTO for getting users with filters
 */
export interface GetUsersDto {
  /** Page number for pagination */
  page: number;
  
  /** Limit of users per page */
  limit: number;
  
  /** Filter by role ID */
  roleId: number;
  
  /** Filter by sender ID */
  senderId: number;
}
