import { IUser } from "../IUser.interface";

export interface AuthResponse {
    token: string;
    user: IUser;
}