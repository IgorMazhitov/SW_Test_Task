import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import axios from "axios";
import { API_URL } from "../api";
import { IUser } from "../types/user.types";
import { AuthResponse } from "../types/api-interfaces/AuthApi.interface";

export default class Store {
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('userEmail', email)
            this.setAuth(true)
            this.setUser(response.userPublic)
        } catch (error) {
            return new Error('Login error')
        }
    }

    async signup(email: string, password: string, roleId: number, userName: string) {
        try {
            const response = await AuthService.signup(userName, roleId, email, password)
            localStorage.setItem('token', response.accessToken)
            this.setAuth(true)
            this.setUser(response.userPublic)
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.userPublic)
        } catch (error) {
            console.log(error)
        }
    }
}
