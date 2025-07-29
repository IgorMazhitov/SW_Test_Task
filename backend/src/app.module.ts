import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import entities
import { User } from './domain/entities/user.entity';
import { Role } from './domain/entities/role.entity';
import { Item } from './domain/entities/item.entity';
import { Token } from './domain/entities/token.entity';
import { AuditLog } from './domain/entities/auditLog.entity';

// Import modules
import { UsersModule } from './application/modules/users/users.module';
import { RolesModule } from './application/modules/roles/roles.module';
import { MessagesModule } from './application/modules/messages/messages.module';
import { AuthModule } from './application/modules/auth/auth.module';
import { Message } from './domain/entities/message.entity';
import { Action } from './domain/entities/action.entity';
import { ActionsModule } from './application/modules/actions/actions.module';
import { AuditModule } from './application/modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Message, Item, Action, Token, AuditLog],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    MessagesModule,
    ActionsModule,
    AuditModule,
    AuthModule,
  ],
})
export class AppModule {}
