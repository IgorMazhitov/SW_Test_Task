import { IAudit } from "../IAudit.interface";

export interface AuditResponse {
  logs: IAudit[];
  total: number;
}

export interface GetAllLogsParams {
  email: string;
  page?: number;
  limit?: number;
}
