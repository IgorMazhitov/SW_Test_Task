import { IUser } from "../IUser.interface";

export interface GetAllUsersResponse {
  users: IUser[];
  count: number;
}

export interface UserCreationDto {
  userName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface ChangeUserDto {
  id: number;
  userName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface GetUsersDto {
  page: number;
  limit: number;
  roleId: number;
  senderId: number;
}
