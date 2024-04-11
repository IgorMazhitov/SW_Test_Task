import { AxiosResponse } from "axios";
import $api from "../http";
import { IAction } from "../interfaces/IAction";
import { IItem } from "../interfaces/IItem";
import { IUser } from "../interfaces/IUser";
import { ActionRequest } from "../interfaces/ActionRequest";

export default class ActionsService {
  static fetchActions(active: boolean): Promise<AxiosResponse<IAction[]>> {
    console.log(active, 'sent')
    return $api.post<IAction[]>("/actions/action/get", {active});
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
