import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../interfaces/IUser";

export default class UsersService {
    static fetchUsers(role: string): Promise<AxiosResponse<IUser[]>> {
        console.log(role, typeof role, 'role role')
        return $api.post<IUser[]>('/users/get', { role })
    }
}