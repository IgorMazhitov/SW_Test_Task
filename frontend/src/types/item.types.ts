/**
 * Item related types and interfaces
 */

/**
 * Represents an item in the system
 */
export interface IItem {
  /** Unique identifier for the item */
  id: number;
  
  /** Name of the item */
  name: string;
  
  /** Description of the item */
  description?: string;
  
  /** Date and time when the item was created */
  createdAt: Date;
  
  /** Date and time when the item was last updated */
  updatedAt?: Date;
}

/**
 * Item create request payload
 */
export interface IItemCreateRequest {
  name: string;
  description?: string;
}

/**
 * Give item request payload
 */
export interface IGiveItemRequest {
  itemId: number;
  userId: number;
}

/**
 * Item filter parameters for listing
 */
export interface IItemFilters {
  page?: number;
  limit?: number;
  userId?: number;
  searchTerm?: string;
}

/**
 * Item list response with pagination
 */
export interface IItemListResponse {
  items: IItem[];
  total: number;
  page: number;
  limit: number;
}
