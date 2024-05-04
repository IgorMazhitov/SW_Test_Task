import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './database/auditLog.entity';
import { User } from 'src/users/database/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AuditController],
  providers: [AuditService],
  imports: [
    TypeOrmModule.forFeature([AuditLog, User]),
    AuthModule
  ],
  exports: [AuditService]
})
export class AuditModule {}
