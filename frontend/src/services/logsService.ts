import {AxiosResponse} from 'axios'
import $api from '../http'
import { AuditResponse, GetAllLogsParams, IAudit } from '../interfaces/IAudit'

export default class LogsService {
    static async getAllLogs(request: GetAllLogsParams): Promise<AuditResponse> {
        const { email, page = 1, limit = 10 } = request;
        const response = await $api.post<AuditResponse>('/logs/all', { email, page, limit })
        const { logs, total } = response.data
        return { logs, total }
    }
}