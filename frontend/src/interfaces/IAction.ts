export interface IAction {
  userId: number;
  type: ActionType;
  description: string;
  id: number;
  approved: boolean;
  active: boolean;
  itemId?: number;
  requestedTime?: Date;
  text?: string;
  approvedTime?: Date;
  approvedBy?: number;
}

export enum ActionType {
  TYPE_1 = "item",
  TYPE_2 = "message",
  TYPE_3 = "type_3",
}
