import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { AuditService } from 'src/application/modules/audit/audit.service';
import { CommonModule } from '../../helpers/common.module';
import { Role } from 'src/domain/entities/role.entity';
import { User } from 'src/domain/entities/user.entity';
import { AuditLog } from 'src/domain/entities/auditLog.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, AuditLog]), CommonModule],
  controllers: [RolesController],
  providers: [RolesService, AuditService],
  exports: [RolesService],
})
export class RolesModule {}
