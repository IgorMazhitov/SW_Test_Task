import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Role } from 'src/roles/database/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => AuditModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
