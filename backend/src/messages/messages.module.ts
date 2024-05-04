import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/database/user.entity';
import { Message } from './database/message.entity';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([User, Message])],
  exports: [MessagesService],
})
export class MessagesModule {}
