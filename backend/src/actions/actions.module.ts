import { Module, forwardRef } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './database/item.entity';
import { Action } from './database/action.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService],
  imports: [
    TypeOrmModule.forFeature([Item, Action]), forwardRef(() => AuthModule)
  ]
})
export class ActionsModule {}
