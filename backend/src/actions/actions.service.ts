import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateItemDto, GiveItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './database/item.entity';
import { Repository } from 'typeorm';
import { ChangeItemDto } from './dto/change-item.dto';
import { ActionRequestDto, ApproveActionDto } from './dto/action-request.dto';
import { Action, ActionType } from './database/action.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/database/user.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
    private jwtService: JwtService,
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

  async approveAction(dto: ApproveActionDto, token: string) {
    try {
      const user: User = this.jwtService.verify(token);
      const action = await this.actionsRepository.findOne({
        where: {
          id: dto.actionId,
        },
      });
      if (action.type === ActionType.TYPE_1) {
        console.log(action);
        await this.giveItemUser(action.userId, action.userGetId, action.itemId);
        action.approved = true;
        action.active = false;
        action.approvedBy = user.id;
        action.approvedTime = new Date();
        await this.actionsRepository.save(action);
        return action;
      } else {
        throw new Error('Not Implemented Type of Action');
      }
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async declineAction(dto: ApproveActionDto, token: string) {
    try {
      const user: User = this.jwtService.verify(token);
      const action = await this.actionsRepository.findOne({
        where: {
          id: dto.actionId,
        },
      });
      action.approved = false;
      action.active = false;
      action.approvedBy = user.id;
      action.approvedTime = new Date();
      await this.actionsRepository.save(action);
      return action;
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async getAllActions(token: string, active: boolean) {
    try {
      const user: User = this.jwtService.verify(token);
      let actions: Action[] = null;
      if (user.role.name === 'Admin') {
        actions = await this.actionsRepository.find({
          where: {
            active: !active,
          },
        });
      } else {
        actions = await this.actionsRepository.find({
          where: {
            active: !active,
            userId: user.id,
          },
        });
      }
      console.log('----------', actions);
      return actions;
    } catch (error) {
      throw new Error(`Error during getting all actions: ${error.message}`);
    }
  }

  private async giveItemUser(userGivingId, userGetId, itemId) {
    try {
      console.log('giving');
      const user = await this.usersRepository.findOne({
        where: {
          id: userGivingId.id,
        },
        relations: {
          items: true,
        },
      });
      const userGet = await this.usersRepository.findOne({
        where: {
          id: userGetId,
        },
        relations: {
          items: true,
        },
      });
      const item = await this.itemsRepository.findOne({
        where: {
          id: itemId,
        },
        relations: {
          users: true,
        },
      });
      console.log(user, userGet, item);
      userGet.items.push(item);
      item.users.push(userGet);
      item.users = item.users.filter((el) => el.id !== user.id);
      user.items = user.items.filter((el) => el.id !== item.id);
      console.log(user, userGet, item);
      await this.usersRepository.save(userGet);
      await this.itemsRepository.save(item);
      const updatedUser = await this.usersRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  async giveItemAdmin(dto: GiveItemDto, token: string) {
    try {
      const user: User = this.jwtService.verify(token);
      if (user.role.name === 'Admin') {
        const userGet = await this.usersRepository.findOne({
          where: {
            id: dto.userId,
          },
          relations: {
            items: true,
          },
        });
        const item = await this.itemsRepository.findOne({
          where: {
            id: dto.itemId,
          },
          relations: {
            users: true,
          },
        });
        userGet.items.push(item);
        item.users.push(userGet);
        await this.usersRepository.save(userGet);
        await this.itemsRepository.save(item);
        return;
      } else {
        throw new Error('User is not Admin');
      }
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  async getAllItems(token: string) {
    try {
      const user: User = this.jwtService.verify(token);
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
}
