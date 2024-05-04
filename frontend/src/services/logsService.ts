import $api from "../api";
import { AuditResponse, GetAllLogsParams } from "../interfaces/api-interfaces/AuditsApi.interface";

export default class LogsService {
  static async getAllLogs(request: GetAllLogsParams): Promise<AuditResponse> {
    try {
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
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching logs");
    }
  }
}
