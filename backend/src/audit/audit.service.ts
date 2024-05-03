import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './database/auditLog.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/users/database/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async logRequest(requestInfo: any, email?: string): Promise<void> {
    try {
      // Log request information to the database
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
      // Log response information to the database
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
    token: string,
    { page = 1, limit = 10 },
    email?: string,
  ): Promise<{ total: number; logs: AuditLog[] }> {
    try {
      const user: User = this.jwtService.verify(token);

      if (!user) {
        throw new Error('User not found or not authorized');
      }
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
