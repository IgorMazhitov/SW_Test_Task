import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Action } from '../entities/action.entity';
import { User } from '../entities/user.entity';
import { ItemHelper } from './services/item.helper';
import { ActionHelper } from './services/action.helper';
import { ActionHandlerService } from './services/action-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Action, User])],
  providers: [ItemHelper, ActionHelper, ActionHandlerService],
  exports: [ItemHelper, ActionHelper, ActionHandlerService],
})
export class CommonModule {}
