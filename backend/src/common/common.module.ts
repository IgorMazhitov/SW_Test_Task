import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Action } from '../entities/action.entity';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';
import { Role } from '../entities/role.entity';
import { ItemHelper } from './services/item.helper';
import { ActionHelper } from './services/action.helper';
import { ActionHandlerService } from './services/action-handler.service';
import { TokenHelper } from './services/token.helper';
import { UserAuthHelper } from './services/user-auth.helper';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Action, User, Token, Role]),
    JwtModule,
  ],
  providers: [ItemHelper, ActionHelper, ActionHandlerService, TokenHelper, UserAuthHelper],
  exports: [ItemHelper, ActionHelper, ActionHandlerService, TokenHelper, UserAuthHelper],
})
export class CommonModule {}
