export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  created_at: Date;
  role: IRole;
}

export interface IRole {
    id: number;
    name: string;
}