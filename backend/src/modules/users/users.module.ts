import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { AuditService } from 'src/modules/audit/audit.service';
import { AuditLog } from 'src/entities/auditLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AuditLog])],
  controllers: [UsersController],
  providers: [UsersService, AuditService],
  exports: [UsersService],
})
export class UsersModule {}
