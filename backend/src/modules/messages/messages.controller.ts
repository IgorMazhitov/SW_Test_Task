import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dtos/send-message.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetMessagesBetweenDto } from './dtos/get-messages.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @ApiOperation({
    summary: 'Send message from Admin to User',
    description: 'Endpoint to send a message from an admin to a user.',
  })
  @ApiBearerAuth()
  @Post('send')
  sendMessageFromAdmin(@Body() request: SendMessageDto) {
    return this.messageService.sendMessageFromAdmin(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get messages between',
    description: 'Endpoint to get messages between two users.',
  })
  @ApiBearerAuth()
  @Get()
  getMessagesBetween(
    @Query('senderId') senderId: number,
    @Query('receiverId') receiverId: number,
  ) {
    const request: GetMessagesBetweenDto = {
      senderId,
      receiverId,
    };
    return this.messageService.getMessagesBetween(request);
  }
}
