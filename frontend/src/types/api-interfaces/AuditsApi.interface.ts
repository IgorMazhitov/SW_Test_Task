import { IAuditLog } from "../audit.types";

export interface AuditResponse {
  logs: IAuditLog[];
  total: number;
}

export interface GetAllLogsParams {
  email: string;
  page?: number;
  limit?: number;
}
