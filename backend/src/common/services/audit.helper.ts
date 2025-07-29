import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/auditLog.entity';
import { BaseService } from '../abstracts/base-service.abstract';
import { GetAllAuditsDto } from '../../modules/audit/dtos/get-all-audits.dto';
import { IAuditLogResponse } from '../../modules/audit/interfaces/audit-log-response.interface';

/**
 * Helper service for audit log operations.
 * Manages the storage and retrieval of audit logs.
 */
@Injectable()
export class AuditHelper extends BaseService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    super();
  }

  /**
   * Creates a request audit log
   * @param requestInfo - Request data to log
   * @param email - Optional user email associated with the request
   */
  async createRequestLog(requestInfo: any, email?: string): Promise<AuditLog> {
    return await this.executeWithErrorHandling(
      async () => {
        const logEntry = this.auditLogRepository.create({
          type: 'request',
          requestData: requestInfo,
          email: email || null,
        });
        
        return await this.auditLogRepository.save(logEntry);
      },
      'Error creating request audit log',
    );
  }

  /**
   * Creates a response audit log
   * @param requestInfo - Associated request data
   * @param responseInfo - Response data to log
   * @param email - Optional user email associated with the response
   */
  async createResponseLog(requestInfo: any, responseInfo: any, email?: string): Promise<AuditLog> {
    return await this.executeWithErrorHandling(
      async () => {
        const logEntry = this.auditLogRepository.create({
          type: 'response',
          requestData: requestInfo,
          responseData: responseInfo,
          email: email || null,
        });
        
        return await this.auditLogRepository.save(logEntry);
      },
      'Error creating response audit log',
    );
  }

  /**
   * Retrieves audit logs with pagination and filtering
   * @param queryParams - Parameters for filtering and pagination
   * @returns Audit logs and total count
   */
  /**
   * Retrieves audit logs with pagination and filtering
   * @param queryParams - Parameters for filtering and pagination
   * @returns Audit logs and total count
   */
  async getAuditLogs(queryParams: GetAllAuditsDto): Promise<IAuditLogResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const { page, limit, email } = queryParams;

        let logsQuery = this.auditLogRepository.createQueryBuilder('auditLog');

        if (email) {
          logsQuery = logsQuery.where('auditLog.email LIKE :email', {
            email: `%${email}%`,
          });
        }

        const total = await logsQuery.getCount();
        const offset = (page - 1) * limit;

        const logs = await logsQuery
          .orderBy('auditLog.createdAt', 'DESC')
          .limit(limit)
          .offset(offset)
          .getMany();

        return { logs, total };
      },
      'Error retrieving audit logs',
    );
  }
}
