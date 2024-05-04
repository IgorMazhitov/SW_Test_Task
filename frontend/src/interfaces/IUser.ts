import { IMessage } from "./IMessage";

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  created_at: Date;
  role: IRole;
  sentMessages?: IMessage[];
  receivedMessages?: IMessage[];
}

export interface GetUsersDto {
    page: number;
    limit: number;
    roleId: number;
    senderId: number;
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
  

export interface IRole {
    id: number;
    name: string;
}

export interface GetAllUsersResponse {
  users: IUser[];
  count: number;
}