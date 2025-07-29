/**
 * Authentication related types and interfaces
 */
import { IUser } from './user.types';

/**
 * Auth response from login and register endpoints
 */
export interface IAuthResponse {
  /** JWT access token */
  accessToken: string;
  
  /** JWT refresh token */
  refreshToken: string;
  
  /** Public user data excluding sensitive information */
  userPublic: IUser;
}

/**
 * Login request payload
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Registration request payload
 */
export interface IRegistrationRequest {
  userName: string;
  email: string;
  password: string;
  roleId: number;
}
