import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/database/user.entity';
import { Message } from './database/message.entity';
import { AuditModule } from 'src/audit/audit.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [
    TypeOrmModule.forFeature([User, Message]),
    forwardRef(() => AuthModule),
    forwardRef(() => AuditModule),
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
