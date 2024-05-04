import axios, {AxiosResponse} from 'axios'
import $api from '../http'
import { AuthResponse } from '../interfaces/AuthResponse'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        console.log(email, password)
        return $api.post('/auth/login', { email, password })
    }

    static async signup(userName:string, roleId: number, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        console.log(userName, roleId, email, password)
        return axios.post('http://localhost:3300/auth/signup', { email, password, userName, roleId })
    }
}