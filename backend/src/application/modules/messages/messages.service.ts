import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dtos/send-message.dto';
import { GetMessagesBetweenDto } from './dtos/get-messages.dto';
import { MessagesHelper } from '../../helpers/messages.helper';
import { BaseService } from '../../abstracts/base-service.abstract';
import { IMessageResponse } from '../../../domain/interfaces/message-response.interface';
import { UserHelper } from '../../helpers/user.helper';
import { User } from 'src/domain/entities/user.entity';

/**
 * Service responsible for message operations.
 * Acts as a facade for message-related functionality.
 */
@Injectable()
export class MessagesService extends BaseService {
  constructor(
    private readonly messagesHelper: MessagesHelper,
    private readonly userHelper: UserHelper,
  ) {
    super();
  }

  /**
   * Sends a message from an admin user to another user
   * @param request - Message data including sender, receiver, and content
   * @returns The created message
   */
  async sendMessageFromAdmin(
    request: SendMessageDto,
  ): Promise<IMessageResponse> {
    return await this.executeWithErrorHandling(async () => {
      const message = await this.messagesHelper.createMessage(request);
      return {
        id: message.id,
        content: message.content,
        sender: { id: message.sender.id },
        receiver: { id: message.receiver.id },
        timestamp: message.timestamp,
      };
    }, 'Error sending message from admin');
  }

  /**
   * Retrieves messages exchanged between two users
   * @param request - User IDs to fetch messages for
   * @returns Array of messages between the specified users
   */
  async getMessagesBetween(
    request: GetMessagesBetweenDto,
  ): Promise<IMessageResponse[]> {
    return await this.executeWithErrorHandling(async () => {
      const messages = await this.messagesHelper.getMessagesBetween(request);
      return messages.map((message) => ({
        id: message.id,
        content: message.content,
        sender: { id: message.sender.id },
        receiver: { id: message.receiver.id },
        timestamp: message.timestamp,
      }));
    }, 'Error retrieving messages between users');
  }

  /**
   * Gets a user by ID with their received messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their received messages
   */
  async getReceiverUser(userId: number): Promise<User> {
    return await this.executeWithErrorHandling(async () => {
      return await this.userHelper.getUserWithReceivedMessages(userId);
    }, 'Error retrieving receiver user');
  }

  /**
   * Gets a user by ID with their sent messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their sent messages
   */
  async getSenderUser(userId: number): Promise<User> {
    return await this.executeWithErrorHandling(async () => {
      return await this.userHelper.getUserWithSentMessages(userId);
    }, 'Error retrieving sender user');
  }
}
