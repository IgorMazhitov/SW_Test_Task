import { ActionType, IAction } from "./IAction";

export interface ActionRequest {
    userId: number;
    userGetId?: number;
    type: ActionType;
    description: string;
    itemId?: number;
  }

  export interface FetchActionsResponse {
    actions: IAction[];
    count?: number;
  }