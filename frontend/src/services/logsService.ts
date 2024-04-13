import {AxiosResponse} from 'axios'
import $api from '../http'
import { AuditResponse, GetAllLogsParams, IAudit } from '../interfaces/IAudit'

export default class LogsService {
    static async getAllLogs(request: GetAllLogsParams): Promise<AxiosResponse<AuditResponse>> {
        const { email, page = 1, limit = 10 } = request;
        return $api.post<AuditResponse>('/logs/all', { email, page, limit })
    }
}