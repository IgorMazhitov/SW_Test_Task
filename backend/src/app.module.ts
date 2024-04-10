import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/database/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/database/role.entity';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { Action } from './actions/database/action.entity';
import { Item } from './actions/database/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Action, Item],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ActionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
