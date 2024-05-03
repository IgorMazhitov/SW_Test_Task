import { AxiosResponse } from "axios";
import $api from "../http";
import { ActionType, IAction } from "../interfaces/IAction";
import { IItem } from "../interfaces/IItem";
import { IUser } from "../interfaces/IUser";
import { ActionRequest, FetchActionsResponse } from "../interfaces/ActionRequest";

export default class ActionsService {
  static fetchActions(active: boolean, type?: ActionType | string): Promise<AxiosResponse<FetchActionsResponse>> {
    return $api.post<FetchActionsResponse>("/actions/action/get", {active, type});
  }

  static createItem(
    name: string,
    description: string
  ): Promise<AxiosResponse<IItem>> {
    return $api.post<IItem>("/actions/item", {
      name,
      description,
    });
  }

  static giveItemAdmin(
    itemId: number,
    userId: number
  ): Promise<AxiosResponse<IItem>> {
    return $api.post<IItem>("/actions/admin/item", {
      itemId,
      userId,
    });
  }

  static requestActionUser(
    dto: ActionRequest
  ): Promise<AxiosResponse<IAction>> {
    return $api.post<IAction>("/actions/action", {
      ...dto,
    });
  }

  static approveAction(actionId: number): Promise<AxiosResponse<IAction>> {
    return $api.post<IAction>("/actions/action/approve", {
      actionId,
    });
  }

  static declineAction(actionId: number): Promise<AxiosResponse<IAction>> {
    return $api.post<IAction>("/actions/action/decline", {
      actionId,
    });
  }


  static giveItemUser(
    itemId: number,
    userEmail: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/actions/user/item", {
      itemId,
      userEmail,
    });
  }

  static getItems(): Promise<AxiosResponse<IItem[]>> {
    return $api.get<IItem[]>("/actions/item");
  }
}
