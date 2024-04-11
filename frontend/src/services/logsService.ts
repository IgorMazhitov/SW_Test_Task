import {AxiosResponse} from 'axios'
import $api from '../http'
import { AuthResponse } from '../interfaces/AuthResponse'
import { IAudit } from '../interfaces/IAudit'

export default class LogsService {
    static async getAllLogs(): Promise<AxiosResponse<IAudit[]>> {
        return $api.post<IAudit[]>('/logs/all')
    }
}