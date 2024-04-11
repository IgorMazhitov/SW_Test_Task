export interface IAudit {
    id: number;
    type: 'request' | 'response';
    requestData: any;
    responseData?: any;
    createdAt: Date;
  }
  