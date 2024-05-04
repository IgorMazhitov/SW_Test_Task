import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Role } from 'src/roles/database/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtService } from '@nestjs/jwt';
import { AuditService } from 'src/audit/audit.service';
import { AuditLog } from 'src/audit/database/auditLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, AuditLog]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuditService],
  exports: [UsersService],
})
export class UsersModule {}
