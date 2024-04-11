import { AxiosResponse } from "axios";
import $api from "../http";
import { IRole, IUser, UserCreationDto } from "../interfaces/IUser";

export default class UsersService {
    static fetchUsers(role: string): Promise<AxiosResponse<IUser[]>> {
        console.log(role, typeof role, 'role role')
        return $api.post<IUser[]>('/users/get', { role })
    }

    static fetchRoles(): Promise<AxiosResponse<IRole[]>> {
        return $api.get<IRole[]>('/roles/all')
    }

    static createUser(request: UserCreationDto): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/users/create', request)
    }
}