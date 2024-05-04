import { makeAutoObservable } from "mobx";
import { IUser } from "../interfaces/IUser";
import AuthService from "../services/authService";
import axios from "axios";

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
            localStorage.setItem('token', response.token)
            localStorage.setItem('userEmail', email)
            this.setAuth(true)
            this.setUser(response.user)
        } catch (error) {
            return new Error('Login error')
        }
    }

    async signup(email: string, password: string, roleId: number, userName: string) {
        try {
            const response = await AuthService.signup(userName, roleId, email, password)
            localStorage.setItem('token', response.token)
            this.setAuth(true)
            this.setUser(response.user)
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('userEmail')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error)
        }
    }
}
