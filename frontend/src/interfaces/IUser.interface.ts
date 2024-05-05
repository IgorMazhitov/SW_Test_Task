import { IMessage } from "./IMessage.interface";
import { IRole } from "./IRole.interface";

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