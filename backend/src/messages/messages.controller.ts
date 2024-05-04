import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dtos/send-message.dto';
import { GetMessagesBetweenDto } from './dtos/get-messages.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @ApiTags('Send message from Admin to User')
  @ApiBearerAuth()
  @Post('send')
  sendMessageFromAdmin(@Body() request: SendMessageDto) {
    return this.messageService.sendMessageFromAdmin(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Get messages between')
  @ApiBearerAuth()
  @Post('get')
  getMessagesBetween(@Body() request: GetMessagesBetweenDto) {
    return this.messageService.getMessagesBetween(request);
  }

  
}
