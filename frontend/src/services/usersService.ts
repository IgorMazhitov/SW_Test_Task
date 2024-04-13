import { AxiosResponse } from "axios";
import $api from "../http";
import { ChangeUserDto, GetUsersDto, IRole, IUser, UserCreationDto } from "../interfaces/IUser";

export default class UsersService {
    static fetchUsers(request: GetUsersDto): Promise<AxiosResponse<IUser[]>> {
        const { page, limit, roleId} = request
        return $api.post<IUser[]>('/users/get', { page, limit, roleId })
    }

    static fetchRoles(): Promise<AxiosResponse<IRole[]>> {
        return $api.get<IRole[]>('/roles/all')
    }

    static createUser(request: UserCreationDto): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/users/create', request)
    }

    static updateUser(request: ChangeUserDto): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/users/change', request)
    }
}