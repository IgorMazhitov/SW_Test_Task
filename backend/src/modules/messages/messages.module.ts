import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Message } from '../../entities/message.entity';
import { CommonModule } from '../../common/common.module';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [
    TypeOrmModule.forFeature([User, Message]),
    CommonModule
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
