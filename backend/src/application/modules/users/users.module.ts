import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from 'src/application/modules/audit/audit.service';
import { CommonModule } from '../../helpers/common.module';
import { UsersService } from './users.service';
import { User } from 'src/domain/entities/user.entity';
import { Role } from 'src/domain/entities/role.entity';
import { AuditLog } from 'src/domain/entities/auditLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, AuditLog]),
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService, AuditService],
  exports: [UsersService],
})
export class UsersModule {}
