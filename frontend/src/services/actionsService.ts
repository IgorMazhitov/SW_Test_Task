import { AxiosResponse } from "axios";
import $api from "../api";
import { ActionType, IAction } from "../interfaces/IAction.interface";
import { IUser } from "../interfaces/IUser.interface";
import {
  ActionRequest,
  ApproveActionRequest,
  DeclineActionRequest,
  FetchActionsRequest,
  FetchActionsResponse,
} from "../interfaces/api-interfaces/ActionsApi.interface";
import { IItem } from "../interfaces/IItem.interface";
import { GiveItemToUserFromAdminDto } from "../interfaces/api-interfaces/ItemsApi.interface";

export default class ActionsService {
  static async fetchActions(
    request: FetchActionsRequest
  ): Promise<FetchActionsResponse> {
    try {
      const { active, type, userId, limit, page } = request;
      const { data } = await $api.get<FetchActionsResponse>("/actions", {
        params: { active, type, userId, limit, page },
      });
      return data;
    } catch (error: any) {
      console.error("Error fetching actions:", error.data.message);
      throw new Error("Error fetching actions");
    }
  }

  static async createItem(name: string, description: string): Promise<IItem> {
    try {
      const { data } = await $api.post<IItem>("/actions/item", {
        name,
        description,
      });
      return data;
    } catch (error) {
      console.error("Error creating item:", error);
      throw new Error("Error creating item");
    }
  }

  static async giveItemAdmin(
    request: GiveItemToUserFromAdminDto
  ): Promise<IItem> {
    try {
      const { data } = await $api.post<IItem>("/actions/admin/item", {
        ...request,
      });
      return data;
    } catch (error) {
      console.error("Error giving item to user:", error);
      throw new Error("Error giving item to user");
    }
  }

  static async requestActionUser(dto: ActionRequest): Promise<IAction> {
    try {
      const { data } = await $api.post<IAction>("/actions/action", {
        ...dto,
      });
      return data;
    } catch (error) {
      console.error("Error requesting action:", error);
      throw new Error("Error requesting action");
    }
  }

  static async approveAction(request: ApproveActionRequest): Promise<IAction> {
    try {
      const { data } = await $api.patch<IAction>("/actions/approve", {
        ...request,
      });
      return data;
    } catch (error) {
      console.error("Error approving action:", error);
      throw new Error("Error approving action");
    }
  }

  static async declineAction(request: DeclineActionRequest): Promise<IAction> {
    try {
      const { data } = await $api.patch<IAction>("/actions/decline", {
        ...request,
      });
      return data;
    } catch (error) {
      console.error("Error declining action:", error);
      throw new Error("Error declining action");
    }
  }

  static async giveItemUser(itemId: number, userEmail: string): Promise<IUser> {
    try {
      const { data } = await $api.post<IUser>("/actions/user/item", {
        itemId,
        userEmail,
      });
      return data;
    } catch (error) {
      console.error("Error giving item to user:", error);
      throw new Error("Error giving item to user");
    }
  }

  static async getItems(userId: number): Promise<IItem[]> {
    try {
      const { data } = await $api.get<IItem[]>(`/actions/item`, {
        params: { userId: userId.toString() },
      });
      return data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw new Error("Error fetching items");
    }
  }
}
