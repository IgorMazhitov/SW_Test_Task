import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './database/item.entity';
import { Action } from './database/action.entity';
import { User } from 'src/users/database/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { Message } from 'src/messages/database/message.entity';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService, JwtService, MessagesService],
  imports: [
    TypeOrmModule.forFeature([Item, Action, User, Message])
  ]
})
export class ActionsModule {}
