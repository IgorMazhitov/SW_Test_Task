import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from '../../entities/auditLog.entity';
import { Repository } from 'typeorm';
import { GetAllAuditsDto } from './dtos/get-all-audits.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>
  ) {}

  async logRequest(requestInfo: any, email?: string): Promise<void> {
    try {
      const logEntry = this.auditLogRepository.create({
        type: 'request',
        requestData: requestInfo,
      });
      if (email) {
        logEntry.email = email;
      }
      await this.auditLogRepository.save(logEntry);
    } catch (error) {
      console.error('Error logging request:', error);
    }
  }

  async logResponse(
    requestInfo: any,
    responseInfo: any,
    email?: string,
  ): Promise<void> {
    try {
      const logEntry = this.auditLogRepository.create({
        type: 'response',
        requestData: requestInfo,
        responseData: responseInfo,
      });
      if (email) {
        logEntry.email = email;
      }
      await this.auditLogRepository.save(logEntry);
    } catch (error) {
      console.error('Error logging response:', error);
    }
  }

  async getAllAudits(
    request: GetAllAuditsDto,
  ): Promise<{ total: number; logs: AuditLog[] }> {
    try {
      const { page, limit, email } = request;

      let logsQuery = this.auditLogRepository.createQueryBuilder('auditLog');

      if (email) {
        logsQuery = logsQuery.where('auditLog.email LIKE :email', {
          email: `%${email}%`,
        });
      }

      const total = await logsQuery.getCount();

      const offset = (page - 1) * limit;

      logsQuery = logsQuery.limit(limit).offset(offset);

      const logs = await logsQuery.getMany();

      return { logs, total };
    } catch (error) {
      console.error('Error loading audits:', error);
      throw new Error('Error loading audits');
    }
  }
}
