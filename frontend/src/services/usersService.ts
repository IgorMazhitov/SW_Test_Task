import $api from "../http";
import {
  ChangeUserDto,
  GetAllUsersResponse,
  GetUsersDto,
  IRole,
  IUser,
  UserCreationDto,
} from "../interfaces/IUser";

export default class UsersService {
  static async fetchUsers(request: GetUsersDto): Promise<GetAllUsersResponse> {
    try {
      const { page, limit, roleId, senderId } = request;
      const { data } = await $api.get<GetAllUsersResponse>(`/users`, {
        params: {
          senderId: senderId.toString(),
          roleId: roleId.toString(),
          page: page.toString(),
          limit: limit.toString(),
        },
      });
      return {
        users: data.users,
        count: data.count,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching users");
    }
  }

  static async fetchRoles(): Promise<IRole[]> {
    try {
      const { data } = await $api.get<IRole[]>("/roles/all");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching roles");
    }
  }

  static async createUser(request: UserCreationDto): Promise<IUser> {
    try {
      const { data } = await $api.post<IUser>("/users/create", request);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating user");
    }
  }

  static async updateUser(request: ChangeUserDto): Promise<IUser> {
    try {
      const { data } = await $api.patch<IUser>("/users/change", request);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating user");
    }
  }
}
