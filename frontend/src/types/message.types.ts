/**
 * Message related types and interfaces
 */
import { IUser } from './user.types';

/**
 * Represents a message in the system
 */
export interface IMessage {
  /** Unique identifier for the message */
  id: number;
  
  /** Content of the message */
  text: string;
  
  /** ID of the user who sent the message */
  senderId: number;
  
  /** User who sent the message */
  sender?: IUser;
  
  /** ID of the user who received the message */
  receiverId: number;
  
  /** User who received the message */
  receiver?: IUser;
  
  /** Date and time when the message was sent */
  sentAt: Date;
}

/**
 * Message create request payload
 */
export interface IMessageCreateRequest {
  receiverId: number;
  text: string;
}

/**
 * Message filter parameters for listing
 */
export interface IMessageFilters {
  page?: number;
  limit?: number;
  userId?: number;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Message list response with pagination
 */
export interface IMessageListResponse {
  messages: IMessage[];
  total: number;
  page: number;
  limit: number;
}
