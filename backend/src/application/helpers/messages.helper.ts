import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { User } from '../../entities/user.entity';
import { BaseService } from '../abstracts/base-service.abstract';
import { SendMessageDto } from '../modules/messages/dtos/send-message.dto';
import { GetMessagesBetweenDto } from '../modules/messages/dtos/get-messages.dto';
import { UserHelper } from '../../common/services/user.helper';

/**
 * Helper service for message operations.
 * Handles database operations related to messages.
 */
@Injectable()
export class MessagesHelper extends BaseService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userHelper: UserHelper,
  ) {
    super();
  }

  /**
   * Creates and saves a new message between users
   * @param request - Data for the new message
   * @returns The created message
   */
  async createMessage(request: SendMessageDto): Promise<Message> {
    return await this.executeWithErrorHandling(
      async () => {
        const { content, receiverId, senderId } = request;
        
        // Get receiver and sender users with their messages
        const receiver = await this.userHelper.getUserWithReceivedMessages(receiverId);
        const sender = await this.userHelper.getUserWithSentMessages(senderId);
        
        // Create message entity
        const messageToSave = this.messagesRepository.create({
          receiver,
          sender,
          content,
        });
        
        // Save the message
        const message = await this.messagesRepository.save(messageToSave);
        
        // Update user message lists
        receiver.receivedMessages.push(message);
        sender.sentMessages.push(message);
        
        // Save updated users
        await this.usersRepository.save(receiver);
        await this.usersRepository.save(sender);
        
        return message;
      },
      'Error creating message',
    );
  }

  /**
   * Retrieves messages exchanged between two users
   * @param request - Data containing user IDs
   * @returns Array of messages between the users
   */
  async getMessagesBetween(request: GetMessagesBetweenDto): Promise<Message[]> {
    return await this.executeWithErrorHandling(
      async () => {
        const messages: Message[] = await this.messagesRepository.find({
          where: [
            {
              sender: { id: request.senderId },
              receiver: { id: request.receiverId },
            },
            {
              sender: { id: request.receiverId },
              receiver: { id: request.senderId },
            },
          ],
          select: {
            content: true,
            sender: { id: true },
            receiver: { id: true },
            timestamp: true
          },
          relations: {
            sender: true,
            receiver: true
          },
          order: { timestamp: 'ASC' } // Order messages by timestamp
        });
        
        return messages;
      },
      'Error retrieving messages between users',
    );
  }

  /**
   * Gets a user by ID with their received messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their received messages
   * @deprecated Use userHelper.getUserWithReceivedMessages instead
   */
  async getReceiverUser(userId: number): Promise<User> {
    return await this.userHelper.getUserWithReceivedMessages(userId);
  }

  /**
   * Gets a user by ID with their sent messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their sent messages
   * @deprecated Use userHelper.getUserWithSentMessages instead
   */
  async getSenderUser(userId: number): Promise<User> {
    return await this.userHelper.getUserWithSentMessages(userId);
  }
}
