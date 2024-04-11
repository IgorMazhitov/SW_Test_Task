export interface IAction {
  userId: number;
  type: ActionType;
  description: string;
  itemId?: number;
  id: number;
  requestedTime?: Date;
  approved: boolean;
  approvedTime?: Date;
  approvedBy?: number;
}

export enum ActionType {
  TYPE_1 = "item",
  TYPE_2 = "type_2",
  TYPE_3 = "type_3",
}
