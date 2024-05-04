import {
  Injectable,
} from '@nestjs/common';
import { CreateItemDto, GiveItemDto } from './dtos/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { Repository } from 'typeorm';
import {
  ActionRequestDto,
  ApproveActionDto,
  GetAllActionsDto,
} from './dtos/action-request.dto';
import { Action, ActionType } from '../../entities/action.entity';
import { User } from 'src/entities/user.entity';
import { MessagesService } from 'src/modules/messages/messages.service';
import { SendMessageDto } from 'src/modules/messages/dtos/send-message.dto';
import { Message } from 'src/entities/message.entity';
import { GetAllItems } from './dtos/get-all-items.dto';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
    private messagesService: MessagesService,
  ) {}

  async createItem(dto: CreateItemDto) {
    try {
      const item = await this.itemsRepository.save(dto);
      return item;
    } catch (error) {
      throw new Error(`Error during item creation: ${error.message}`);
    }
  }

  async requestAction(dto: ActionRequestDto) {
    try {
      const request = await this.actionsRepository.save({
        ...dto,
        active: true,
      });
      return request;
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async approveAction(dto: ApproveActionDto): Promise<Action> {
    try {
      const user = await this.getUserById(dto.userId);
      const action = await this.actionsRepository.findOne({
        where: {
          id: dto.actionId,
        },
      });

      if (action.type === ActionType.TYPE_1) {
        const transactionStatus: boolean = await this.giveItemUser(
          action.userId,
          action.userGetId,
          action.itemId,
          dto,
        );

        if (!transactionStatus) {
          return action;
        }
      } else if (action.type === ActionType.TYPE_2) {
        const request: SendMessageDto = {
          senderId: action.userId,
          receiverId: action.userGetId,
          content: action.text,
        };
        const message: Message =
          await this.messagesService.sendMessageFromAdmin(request);

        if (!message) {
          return action;
        }
      }

      action.approved = true;
      action.active = false;
      action.approvedBy = user.id;
      action.approvedTime = new Date();

      await this.actionsRepository.save(action);

      return action;
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async declineAction(dto: ApproveActionDto) {
    try {
      const user = await this.getUserById(dto.userId);
      const action = await this.actionsRepository.findOne({
        where: {
          id: dto.actionId,
        },
      });
      action.approved = false;
      action.active = false;
      action.approvedBy = user.id;
      action.approvedTime = new Date();
      const result = await this.actionsRepository.save(action);
      return result;
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async getAllActions(
    request: GetAllActionsDto,
  ): Promise<{ actions: Action[]; count?: number }> {
    try {
      const { userId, type, active } = request;
      const user: User = await this.getUserById(userId);
      console.log(user, 'Admin')
      let actions: Action[] = null;
      if (user.role.name === 'Admin') {
        const query: any = {
          active: active,
        };

        if (type) {
          query.type = type;
        }

        actions = await this.actionsRepository.find({
          where: query,
        });

        if (active) {
          const count = await this.actionsRepository.count({
            where: {
              active: true,
              type,
            },
          });
          console.log(actions, 'lol')

          return { actions, count };
        }
      } else {
        const query: any = {
          active: active,
          userId: user.id,
        };

        if (type) {
          query.type = type;
        }

        actions = await this.actionsRepository.find({
          where: query,
        });
      }
      console.log(actions, 'test')
      return { actions };
    } catch (error) {
      throw new Error(`Error during getting all actions: ${error.message}`);
    }
  }

  private async giveItemUser(
    userGivingId: number,
    userGetId: number,
    itemId: number,
    dto?: ApproveActionDto,
  ) {
    try {
      const user = await this.fetchUserWithItems(userGivingId);
      const userGet = await this.fetchUserWithItems(userGetId);
      const item = await this.fetchItemWithUsers(itemId);

      const hasUserItem = user.items.some((el) => el.id === item.id);

      if (!hasUserItem) {
        await this.declineAction(dto);
        return false;
      }
      userGet.items.push(item);
      item.users.push(userGet);
      item.users = item.users.filter((el) => el.id !== user.id);
      user.items = user.items.filter((el) => el.id !== item.id);

      await this.usersRepository.save(userGet);
      await this.itemsRepository.save(item);
      await this.usersRepository.save(user);

      return true;
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  private async fetchUserWithItems(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: { items: true },
    });
  }

  private async fetchItemWithUsers(itemId: number) {
    return this.itemsRepository.findOne({
      where: { id: itemId },
      relations: { users: true },
    });
  }

  async giveItemAdmin(dto: GiveItemDto) {
    try {
      const { adminId, itemId, userId } = dto;
      const user: User = await this.getUserById(adminId);

      if (user.role.name !== 'Admin') {
        throw new Error('User is not Admin');
      }

      const userGet = await this.fetchUserWithItems(userId);
      const item = await this.fetchItemWithUsers(itemId);

      userGet.items.push(item);
      item.users.push(userGet);

      await this.usersRepository.save(userGet);
      await this.itemsRepository.save(item);
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  async getAllItems(request: GetAllItems) {
    try {
      const { userId } = request;
      const user: User = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          role: true,
        },
      });
      let items: Item[] = null;
      if (user.role.name === 'Admin') {
        items = await this.itemsRepository.find();
      } else {
        items = await this.itemsRepository.find({
          where: {
            users: {
              id: user.id,
            },
          },
        });
      }
      return items;
    } catch (error) {
      throw new Error(`Error during getting all items: ${error.message}`);
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          role: true,
        }
      });
      return user;
    } catch (error) {
      throw new Error(`Error during getting user by id: ${error.message}`);
    }
  }
}
