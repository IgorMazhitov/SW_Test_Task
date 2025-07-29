import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../../../modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { Token } from 'src/entities/token.entity';
import { CommonModule } from 'src/application/helpers/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    TypeOrmModule.forFeature([User, Role, Token]),
    CommonModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
