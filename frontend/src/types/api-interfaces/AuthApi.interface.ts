import { IUser } from "../user.types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    userPublic: IUser;
}
