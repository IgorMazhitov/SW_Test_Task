import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { User } from 'src/entities/user.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuditService } from 'src/modules/audit/audit.service';
import { AuditLog } from 'src/entities/auditLog.entity';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, AuditLog]),
    CommonModule
  ],
  controllers: [RolesController],
  providers: [RolesService, AuditService],
  exports: [RolesService],
})
export class RolesModule {}
