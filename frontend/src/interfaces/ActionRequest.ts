import { ActionType } from "./IAction";

export interface ActionRequest {
    userId: number;
    userGetId: number;
    type: ActionType;
    description: string;
    itemId?: number;
  }