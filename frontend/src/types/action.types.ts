
/**
 * Action types enum
 */
export enum ActionType {
  TYPE_1 = 'item',
  TYPE_2 = 'type2',
  TYPE_3 = 'type3',
  ITEM_GIVE = 'item_give',
  ITEM_REQUEST = 'item_request',
}

/**
 * Represents an action in the system
 */
export interface IAction {
  /** Unique identifier for the action */
  id: number;
  
  /** Type of action */
  type: ActionType;
  
  /** ID of the user who initiated the action */
  userId: number;
  
  /** Description of the action */
  description?: string;
  
  /** Date and time when the action was requested */
  requestedTime: Date;
  
  /** Whether the action is active */
  active: boolean;
  
  /** Whether the action was approved */
  approved: boolean;
  
  /** ID of the item associated with the action (if applicable) */
  itemId?: number;
  
  /** Text details of the action */
  text?: string;
  
  /** Date and time when the action was approved */
  approvedTime?: Date;
  
  /** ID of the user who approved the action */
  approvedBy?: number;
}

/**
 * Action create request payload
 */
export interface IActionCreateRequest {
  type: ActionType;
  description?: string;
  itemId?: number;
  text?: string;
}

/**
 * Action approve request payload
 */
export interface IActionApproveRequest {
  id: number;
}

/**
 * Action decline request payload
 */
export interface IActionDeclineRequest {
  id: number;
}

/**
 * Action filter parameters for listing
 */
export interface IActionFilters {
  page?: number;
  limit?: number;
  type?: ActionType;
  userId?: number;
  active?: boolean;
  approved?: boolean;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Action list response with pagination
 */
export interface IActionListResponse {
  actions: IAction[];
  total: number;
  page: number;
  limit: number;
}
