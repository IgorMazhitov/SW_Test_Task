export interface IAudit {
  id: number;
  type: "request" | "response";
  requestData: any;
  createdAt: Date;
  responseData?: any;
  email?: string;
}