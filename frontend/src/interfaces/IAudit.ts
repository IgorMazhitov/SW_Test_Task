export interface IAudit {
  id: number;
  type: "request" | "response";
  requestData: any;
  createdAt: Date;
  responseData?: any;
  email?: string;
}

export interface AuditResponse {
    logs: IAudit[],
    total: number
}

export interface GetAllLogsParams {
    email: string;
    page?: number;
    limit?: number;
  }
