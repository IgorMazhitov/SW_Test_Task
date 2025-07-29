import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles-auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dtos/send-message.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetMessagesBetweenDto } from './dtos/get-messages.dto';
import { IMessageResponse } from '../../../domain/interfaces/message-response.interface';
import { MessagesService } from './messages.service';

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
  @ApiResponse({
    status: 201,
    description: 'Message sent successfully',
    type: Object,
    schema: {
      example: {
        id: 1,
        content: 'Hello, how are you?',
        sender: { id: 1 },
        receiver: { id: 2 },
        timestamp: new Date()
      }
    }
  })
  @ApiBearerAuth()
  @Post('send')
  async sendMessageFromAdmin(@Body() request: SendMessageDto): Promise<IMessageResponse> {
    return await this.messageService.sendMessageFromAdmin(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get messages between users',
    description: 'Endpoint to get messages between two users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Messages retrieved successfully',
    type: Array,
    schema: {
      example: [
        {
          id: 1,
          content: 'Hello, how are you?',
          sender: { id: 1 },
          receiver: { id: 2 },
          timestamp: new Date()
        },
        {
          id: 2,
          content: 'I am good, thanks!',
          sender: { id: 2 },
          receiver: { id: 1 },
          timestamp: new Date()
        }
      ]
    }
  })
  @ApiBearerAuth()
  @Get()
  async getMessagesBetween(
    @Query('senderId') senderId: number,
    @Query('receiverId') receiverId: number,
  ): Promise<IMessageResponse[]> {
    const request: GetMessagesBetweenDto = {
      senderId,
      receiverId,
    };
    return await this.messageService.getMessagesBetween(request);
  }
}
