import { IMessage } from "./message.types";
import { IRole } from "./role.types";

/**
 * Represents a user in the system
 */
export interface IUser {
  /** Unique identifier for the user */
  id: number;

  /** Username for display and identification */
  userName: string;

  /** Email address used for login and communication */
  email: string;

  /** User's role that determines permissions */
  role: IRole;

  /** Messages sent by this user */
  sentMessages?: IMessage[];

  /** Messages received by this user */
  receivedMessages?: IMessage[];
}

/**
 * User create request payload
 */
export interface IUserCreateRequest {
  userName: string;
  email: string;
  password: string;
  roleId: number;
}

/**
 * User update request payload
 */
export interface IUserUpdateRequest {
  id: number;
  userName?: string;
  email?: string;
  roleId?: number;
}

/**
 * User filter parameters for listing
 */
export interface IUserFilters {
  page?: number;
  limit?: number;
  roleId?: number;
  searchTerm?: string;
}

/**
 * User list response with pagination
 */
export interface IUserListResponse {
  users: IUser[];
  total: number;
  page: number;
  limit: number;
}
