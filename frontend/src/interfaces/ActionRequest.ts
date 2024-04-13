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