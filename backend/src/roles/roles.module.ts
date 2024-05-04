import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './database/role.entity';
import { User } from 'src/users/database/user.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuditService } from 'src/audit/audit.service';
import { AuditLog } from 'src/audit/database/auditLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, AuditLog])],
  controllers: [RolesController],
  providers: [RolesService, AuditService],
  exports: [RolesService],
})
export class RolesModule {}
