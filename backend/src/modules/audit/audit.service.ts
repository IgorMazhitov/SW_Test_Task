import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../entities/auditLog.entity';
import { GetAllAuditsDto } from './dtos/get-all-audits.dto';
import { AuditHelper } from '../../common/services/audit.helper';
import { BaseService } from '../../common/abstracts/base-service.abstract';
import { IAuditLogResponse } from './interfaces/audit-log-response.interface';

/**
 * Service responsible for audit logging operations.
 * Acts as a facade for audit logging functionality.
 */
@Injectable()
export class AuditService extends BaseService {
  constructor(private readonly auditHelper: AuditHelper) {
    super();
  }

  /**
   * Logs an API request
   * @param requestInfo - Request data to log
   * @param email - Optional user email for the request
   */
  async logRequest(requestInfo: any, email?: string): Promise<void> {
    await this.executeWithErrorHandling(
      async () => {
        await this.auditHelper.createRequestLog(requestInfo, email);
      },
      'Failed to log request',
    );
  }

  /**
   * Logs an API response
   * @param requestInfo - Associated request data
   * @param responseInfo - Response data to log
   * @param email - Optional user email for the response
   */
  async logResponse(
    requestInfo: any,
    responseInfo: any,
    email?: string,
  ): Promise<void> {
    await this.executeWithErrorHandling(
      async () => {
        await this.auditHelper.createResponseLog(requestInfo, responseInfo, email);
      },
      'Failed to log response',
    );
  }

  /**
   * Retrieves audit logs with pagination and filtering
   * @param request - Query parameters for filtering and pagination
   * @returns Object containing audit logs and total count
   */
  /**
   * Retrieves audit logs with pagination and filtering
   * @param request - Query parameters for filtering and pagination
   * @returns Object containing audit logs and total count
   */
  async getAllAudits(request: GetAllAuditsDto): Promise<IAuditLogResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const { logs, total } = await this.auditHelper.getAuditLogs(request);
        return { logs, total };
      },
      'Failed to retrieve audit logs',
    );
  }
}
