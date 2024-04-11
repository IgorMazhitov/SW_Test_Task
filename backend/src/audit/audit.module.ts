import { Module, forwardRef } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './database/auditLog.entity';
import { User } from 'src/users/database/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuditController],
  providers: [AuditService],
  imports: [
    TypeOrmModule.forFeature([AuditLog, User]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),

  ],
  exports: [AuditService]
})
export class AuditModule {}
