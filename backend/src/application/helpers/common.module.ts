import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { Item } from 'src/domain/entities/item.entity';
import { Action } from 'src/domain/entities/action.entity';
import { User } from 'src/domain/entities/user.entity';
import { Token } from 'src/domain/entities/token.entity';
import { Role } from 'src/domain/entities/role.entity';
import { AuditLog } from 'src/domain/entities/auditLog.entity';
import { Message } from 'src/domain/entities/message.entity';
import { ItemHelper } from './item.helper';
import { ActionHelper } from './action.helper';
import { ActionHandlerService } from './action-handler.service';
import { TokenHelper } from './token.helper';
import { UserAuthHelper } from './user-auth.helper';
import { AuditHelper } from './audit.helper';
import { MessagesHelper } from './messages.helper';
import { UserHelper } from './user.helper';
import { RoleHelper } from './role.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Item,
      Action,
      User,
      Token,
      Role,
      AuditLog,
      Message,
    ]),
    JwtModule,
  ],
  providers: [
    ItemHelper,
    ActionHelper,
    ActionHandlerService,
    TokenHelper,
    UserAuthHelper,
    AuditHelper,
    MessagesHelper,
    UserHelper,
    RoleHelper,
  ],
  exports: [
    ItemHelper,
    ActionHelper,
    ActionHandlerService,
    TokenHelper,
    UserAuthHelper,
    AuditHelper,
    MessagesHelper,
    UserHelper,
    RoleHelper,
  ],
})
export class CommonModule {}
