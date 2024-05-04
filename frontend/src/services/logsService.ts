import { AxiosResponse } from "axios";
import $api from "../http";
import { AuditResponse, GetAllLogsParams } from "../interfaces/IAudit";

export default class LogsService {
  static async getAllLogs(request: GetAllLogsParams): Promise<AuditResponse> {
    const { email, page = 1, limit = 10 } = request;
    const { data } = await $api.get<AuditResponse>("/logs", {
      params: {
        email: email.toString(),
        page: page.toString(),
        limit: limit.toString(),
      },
    });
    const { logs, total } = data;
    return { logs, total };
  }
}
