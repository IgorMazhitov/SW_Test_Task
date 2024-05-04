import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from '../../entities/auditLog.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [AuditController],
  providers: [AuditService],
  imports: [
    TypeOrmModule.forFeature([AuditLog, User]),
  ],
  exports: [AuditService]
})
export class AuditModule {}
