import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './database/message.entity';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dtos/send-message.dto';
import { User } from 'src/users/database/user.entity';
import { GetMessagesBetweenDto } from './dtos/get-messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async sendMessageFromAdmin(request: SendMessageDto) {
    try {
      const { content, receiverId, senderId } = request;
      const receiver = await this.getReceiverUser(receiverId);
      const sender = await this.getSenderUser(senderId);
      const messageToSave = await this.messagesRepository.create({
        receiver,
        sender,
        content,
      });
      const message = await this.messagesRepository.save(messageToSave);
      receiver.receivedMessages.push(message);
      sender.sentMessages.push(message);
      await this.usersRepository.save(receiver);
      await this.usersRepository.save(sender);
      return message;
    } catch (error) {
      throw new Error(
        `Error during message sending from Admin. Error: ${error}`,
      );
    }
  }

  async getMessagesBetween(request: GetMessagesBetweenDto) {
    try {
      const messages: Message[] = await this.messagesRepository.find({
        where: [
          {
            sender: {
              id: request.senderId,
            },
            receiver: {
              id: request.receiverId,
            },
          },
          {
            sender: {
              id: request.receiverId,
            },
            receiver: {
              id: request.senderId,
            },
          },
        ],
        select: {
            content: true,
            sender: {
                id: true
            },
            receiver: {
                id: true
            }
        },
        relations: {
            sender: true,
            receiver: true
        }
      });
      return messages;
    } catch (error) {
      throw new Error(`Error during gettign messages between. Error: ${error}`);
    }
  }

  async getReceiverUser(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          receivedMessages: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error during getting receiver User. Error: ${error}`);
    }
  }

  async getSenderUser(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          sentMessages: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error during getting sender User. Error: ${error}`);
    }
  }
}
