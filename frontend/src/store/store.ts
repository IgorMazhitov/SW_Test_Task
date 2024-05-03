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
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    async signup(email: string, password: string, roleId: number, userName: string) {
        try {
            const response = await AuthService.signup(userName, roleId, email, password)
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error)
        }
    }
}
