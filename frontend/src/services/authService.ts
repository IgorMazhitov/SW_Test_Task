import axios, { AxiosResponse } from "axios";
import $api from "../api";
import { AuthResponse } from "../interfaces/api-interfaces/AuthApi.interface";

export default class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await $api.post("/auth/login", { email, password });
      return data;
    } catch (error) {
      console.error("Error logging request:", error);
      throw new Error("Error logging request");
    }
  }

  static async signup(
    userName: string,
    roleId: number,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const { data } = await $api.post("http://localhost:3300/auth/signup", {
        email,
        password,
        userName,
        roleId,
      });
      return data;
    } catch (error) {
      console.error("Error logging response:", error);
      throw new Error("Error logging response");
    }
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const { data } = await $api.post("/auth/logout");
      return data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("Error logging out");
    }
  }
}
