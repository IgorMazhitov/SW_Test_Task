import {AxiosResponse} from 'axios'
import $api from '../http'
import { AuthResponse } from '../interfaces/AuthResponse'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/login', { email, password })
    }

    static async signup(userName:string, roleId: number, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/signup', { email, password, userName, roleId })
    }
}