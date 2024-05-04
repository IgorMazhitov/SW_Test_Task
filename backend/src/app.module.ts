import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/user.entity';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './entities/role.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ActionsModule } from './modules/actions/actions.module';
import { Action } from './entities/action.entity';
import { Item } from './entities/item.entity';
import { InitialRoles1712854276047 } from './migrations/1712854276047-initialRoles';
import { AuditLog } from './entities/auditLog.entity';
import { AuditModule } from './modules/audit/audit.module';
import { MessagesModule } from './modules/messages/messages.module';
import { Message } from './entities/message.entity';

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
      entities: [User, Role, Action, Item, AuditLog, Message],
      synchronize: true,
      autoLoadEntities: true,
      migrations: [InitialRoles1712854276047],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ActionsModule,
    AuditModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
