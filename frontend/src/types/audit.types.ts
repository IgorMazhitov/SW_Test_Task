/**
 * Audit log related types and interfaces
 */
import { IUser } from './user.types';

/**
 * Represents an audit log entry in the system
 */
export interface IAuditLog {
  /** Unique identifier for the audit log */
  id: number;
  
  /** ID of the user who performed the action */
  userId: number;

  email?: string;
  
  /** User who performed the action */
  user?: IUser;
  
  /** Type of action performed */
  action: string;
  
  /** Entity type on which the action was performed */
  entity: string;
  
  /** ID of the entity on which the action was performed */
  entityId?: number;
  
  /** Request data in JSON format */
  request?: string;
  
  /** Response data in JSON format */
  response?: string;

  type?: string;
  
  /** IP address from which the action was performed */
  ip?: string;
  
  /** User agent from which the action was performed */
  userAgent?: string;
  
  /** Date and time when the action was performed */
  timestamp: Date;
}

/**
 * Audit log filter parameters for listing
 */
export interface IAuditLogFilters {
  page?: number;
  limit?: number;
  userId?: number;
  action?: string;
  entity?: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Audit log list response with pagination
 */
export interface IAuditLogListResponse {
  logs: IAuditLog[];
  total: number;
  page: number;
  limit: number;
}
