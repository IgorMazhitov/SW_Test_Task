import { ActionType, IAction } from "./IAction";

export interface ActionRequest {
    userId: number;
    type: ActionType;
    description: string;
    userGetId?: number;
    itemId?: number;
    text?: string;
  }

  export interface FetchActionsResponse {
    actions: IAction[];
    count?: number;
  }

  export interface ApproveActionRequest {
    userId: number;
    actionId: number;
  }

  export interface DeclineActionRequest extends ApproveActionRequest {}

  export interface FetchActionsRequest {
    userId: number;
    type: ActionType | undefined;
    active: boolean;
  }