import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from 'src/application/modules/messages/messages.service';
import { AuditService } from 'src/application/modules/audit/audit.service';
import { CommonModule } from 'src/application/helpers/common.module';
import { ActionsService } from './actions.service';
import { Item } from 'src/domain/entities/item.entity';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from 'src/domain/entities/user.entity';
import { Message } from 'src/domain/entities/message.entity';
import { AuditLog } from 'src/domain/entities/auditLog.entity';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService, MessagesService, AuditService],
  imports: [
    TypeOrmModule.forFeature([Item, Action, User, Message, AuditLog]),
    CommonModule,
  ],
})
export class ActionsModule {}
