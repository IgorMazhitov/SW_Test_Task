import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Action } from '../entities/action.entity';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';
import { Role } from '../entities/role.entity';
import { AuditLog } from '../entities/auditLog.entity';
import { Message } from '../entities/message.entity';
import { ItemHelper } from './services/item.helper';
import { ActionHelper } from './services/action.helper';
import { ActionHandlerService } from './services/action-handler.service';
import { TokenHelper } from './services/token.helper';
import { UserAuthHelper } from './services/user-auth.helper';
import { AuditHelper } from './services/audit.helper';
import { MessagesHelper } from './services/messages.helper';
import { UserHelper } from './services/user.helper';
import { RoleHelper } from './services/role.helper';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Action, User, Token, Role, AuditLog, Message]),
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
    RoleHelper
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
    RoleHelper
  ],
})
export class CommonModule {}
