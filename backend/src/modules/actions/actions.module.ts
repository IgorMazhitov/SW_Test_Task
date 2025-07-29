import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { Action } from '../../entities/action.entity';
import { User } from 'src/entities/user.entity';
import { MessagesService } from 'src/modules/messages/messages.service';
import { Message } from 'src/entities/message.entity';
import { AuditService } from 'src/modules/audit/audit.service';
import { AuditLog } from 'src/entities/auditLog.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService, MessagesService, AuditService],
  imports: [
    TypeOrmModule.forFeature([Item, Action, User, Message, AuditLog]),
    CommonModule,
  ],
})
export class ActionsModule {}
