import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './database/item.entity';
import { Repository } from 'typeorm';
import { ChangeItemDto } from './dto/change-item.dto';
import { ActionRequestDto } from './dto/action-request.dto';
import { Action } from './database/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
  ) {}

  async createItem(dto: CreateItemDto) {
    try {
      const item = await this.itemsRepository.save(dto);
      return item;
    } catch (error) {
      throw new Error(`Error during item creation: ${error.message}`);
    }
  }

  async changeItem(dto: ChangeItemDto) {
    try {
      const itemToChange = await this.itemsRepository.findOne({
        where: {
          id: dto.id,
        },
      });
      if (!itemToChange) {
        throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
      }
      const itemChanged = await this.itemsRepository.save({
        ...itemToChange,
        description: dto.description,
        name: dto.name,
      });
      return itemChanged;
    } catch (error) {
      throw new Error(`Error during item creation: ${error.message}`);
    }
  }

  async requestAction(dto: ActionRequestDto) {
    try {
      const request = await this.actionsRepository.save(dto);
      return request;
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  async getAllActions() {
    try {
      const actions: Action[] = await this.actionsRepository.find();
      return actions;
    } catch (error) {
      throw new Error(`Error during getting all actions: ${error.message}`);
    }
  }

  async getAllItems() {
    try {
      const items: Item[] = await this.itemsRepository.find();
      return items;
    } catch (error) {
      throw new Error(`Error during getting all items: ${error.message}`);
    }
  }
}
