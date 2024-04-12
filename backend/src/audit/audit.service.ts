import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './database/auditLog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/database/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async logRequest(requestInfo: any): Promise<void> {
    try {
      // Log request information to the database
      const logEntry = this.auditLogRepository.create({
        type: 'request',
        requestData: requestInfo,
      });
      await this.auditLogRepository.save(logEntry);
    } catch (error) {
      console.error('Error logging request:', error);
    }
  }

  async logResponse(requestInfo: any, responseInfo: any): Promise<void> {
    try {
      // Log response information to the database
      const logEntry = this.auditLogRepository.create({
        type: 'response',
        requestData: requestInfo,
        responseData: responseInfo,
      });
      await this.auditLogRepository.save(logEntry);
    } catch (error) {
      console.error('Error logging response:', error);
    }
  }

  async getAllAudits(token: string) {
    try {
        const user: User = this.jwtService.verify(token);
        const isUserAdmin = await this.userRepository.findOne({
            where: {
                id: user.id
            },
            relations: {
                role: true
            }
        })
        if (isUserAdmin.role.name === 'Admin') {
            const logs: AuditLog[] = await this.auditLogRepository.find()
            return logs
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
      console.error('Error loading audits:', error);
    }
  }
}
