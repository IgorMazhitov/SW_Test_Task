import { AxiosResponse } from "axios";
import $api from "../http";
import { ActionType, IAction } from "../interfaces/IAction";
import { GiveItemToUserFromAdminDto, IItem } from "../interfaces/IItem";
import { IUser } from "../interfaces/IUser";
import {
  ActionRequest,
  ApproveActionRequest,
  DeclineActionRequest,
  FetchActionsRequest,
  FetchActionsResponse,
} from "../interfaces/ActionRequest";

export default class ActionsService {
  static fetchActions(
    request: FetchActionsRequest
  ): Promise<AxiosResponse<FetchActionsResponse>> {
    const { active, type, userId } = request
    return $api.get<FetchActionsResponse>("/actions", {
      params: { active, type, userId },
    });
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

  static async giveItemAdmin(
    request: GiveItemToUserFromAdminDto
  ): Promise<IItem> {
    const { data } = await $api.post<IItem>("/actions/admin/item", {
      ...request,
    });
    return data;
  }

  static requestActionUser(
    dto: ActionRequest
  ): Promise<AxiosResponse<IAction>> {
    return $api.post<IAction>("/actions/action", {
      ...dto,
    });
  }

  static approveAction(request: ApproveActionRequest): Promise<AxiosResponse<IAction>> {
    return $api.patch<IAction>("/actions/approve", {
      ...request,
    });
  }

  static declineAction(request: DeclineActionRequest): Promise<AxiosResponse<IAction>> {
    return $api.patch<IAction>("/actions/decline", {
      ...request
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

  static async getItems(userId: number): Promise<IItem[]> {
    const { data } = await $api.get<IItem[]>(`/actions/item`, {
      params: { userId: userId.toString() },
    });
    return data;
  }
}
