import { AxiosResponse } from "axios";
import $api from "../http";
import {
  ChangeUserDto,
  GetUsersDto,
  IRole,
  IUser,
  UserCreationDto,
} from "../interfaces/IUser";

export default class UsersService {
  static async fetchUsers(request: GetUsersDto): Promise<IUser[]> {
    const { page, limit, roleId, senderId } = request;
    const { data } = await $api.get<IUser[]>(`/users`, {
      params: {
        senderId: senderId.toString(),
        roleId: roleId.toString(),
        page: page.toString(),
        limit: limit.toString(),
      },
    });
    return data;
  }

  static fetchRoles(): Promise<AxiosResponse<IRole[]>> {
    return $api.get<IRole[]>("/roles/all");
  }

  static createUser(request: UserCreationDto): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/users/create", request);
  }

  static updateUser(request: ChangeUserDto): Promise<AxiosResponse<IUser>> {
    return $api.patch<IUser>("/users/change", request);
  }
}
