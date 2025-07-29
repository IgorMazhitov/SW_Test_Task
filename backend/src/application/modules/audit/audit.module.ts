import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from '../../../modules/audit/audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from '../../entities/auditLog.entity';
import { User } from 'src/entities/user.entity';
import { CommonModule } from 'src/application/helpers/common.module';

@Module({
  controllers: [AuditController],
  providers: [AuditService],
  imports: [TypeOrmModule.forFeature([AuditLog, User]), CommonModule],
  exports: [AuditService],
})
export class AuditModule {}
