import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuditModule } from 'src/audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/database/user.entity';
import { Role } from 'src/roles/database/role.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    TypeOrmModule.forFeature([User, Role])
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
