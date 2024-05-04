import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Role } from 'src/roles/database/role.entity';
import { AuditService } from 'src/audit/audit.service';
import { AuditLog } from 'src/audit/database/auditLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AuditLog])],
  controllers: [UsersController],
  providers: [UsersService, AuditService],
  exports: [UsersService],
})
export class UsersModule {}
