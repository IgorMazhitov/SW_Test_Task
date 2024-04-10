import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './database/role.entity';
import { User } from 'src/users/database/user.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
