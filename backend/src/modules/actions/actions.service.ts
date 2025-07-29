import { Injectable } from '@nestjs/common';
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
import { IHandleAction } from './interfaces/actions.interface';
import { RoleType } from 'src/entities/role.entity';

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

  /**
   * Creates a new item in the database.
   * @param dto - The data transfer object containing item details.
   * @returns The created item.
   */
  async createItem(dto: CreateItemDto) {
    try {
      const item = await this.itemsRepository.save(dto);
      return item;
    } catch (error) {
      throw new Error(`Error during item creation: ${error.message}`);
    }
  }

  /**
   * Creates a new action request in the database.
   * @param dto - The data transfer object containing action request details.
   * @returns The created action.
   */
  async requestAction(dto: ActionRequestDto) {
    try {
      const action = new Action();
      action.userId = dto.userId;
      action.type = dto.type;
      action.text = dto.description;
      action.itemId = dto.itemId;
      action.userGetId = dto.userGetId;
      action.requestedTime = new Date();
      action.active = true;

      return await this.saveAction(action);
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  /**
   * Approves an action by updating its status and handling it according to its type.
   * @param dto - The data transfer object containing approval details.
   * @returns The updated action with approval information.
   */
  async approveAction(dto: ApproveActionDto): Promise<Action> {
    try {
      const [user, action] = await Promise.all([
        this.getUserById(dto.userId),
        this.getActionById(dto.actionId),
      ]);

      const response = await this.handleAction({ action, dto });

      if (!response) return action;

      action.approved = true;
      action.active = false;
      action.approvedBy = user.id;
      action.approvedTime = new Date();

      return await this.saveAction(action);
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  /**
   * Routes an action to the appropriate handler based on its type.
   * @param params - The action parameters containing the action and DTO.
   * @returns The result of the appropriate handler.
   */
  async handleAction(params: IHandleAction): Promise<null> {
    const { action, dto } = params;

    let response = null;

    switch (action.type) {
      case ActionType.TYPE_1:
        response = await this.handleItemAction({ action, dto });
        break;
      case ActionType.TYPE_2:
        response = await this.handleMessageAction({ action, dto });
        break;
    }

    return response;
  }

  /**
   * Handles a message-type action by sending a message from one user to another.
   * @param params - The action parameters containing the action details.
   * @returns The action if the message could not be sent.
   */
  async handleMessageAction(params: IHandleAction) {
    const { action } = params;

    const request: SendMessageDto = {
      senderId: action.userId,
      receiverId: action.userGetId,
      content: action.text,
    };
    const message: Message =
      await this.messagesService.sendMessageFromAdmin(request);

    if (!message) return action;
  }

  /**
   * Handles an item-type action by transferring an item from one user to another.
   * @param params - The action parameters containing the action and DTO.
   * @returns The action if the transaction could not be completed.
   */
  async handleItemAction(params: IHandleAction) {
    const { action, dto } = params;

    const transactionStatus: boolean = await this.giveItemUser(
      action.userId,
      action.userGetId,
      action.itemId,
      dto,
    );

    if (!transactionStatus) return action;
  }

  /**
   * Declines an action by updating its status and related fields.
   * @param dto - The data transfer object containing decline details.
   * @returns The updated action with decline information.
   */
  async declineAction(dto: ApproveActionDto) {
    try {
      const [user, action] = await Promise.all([
        this.getUserById(dto.userId),
        this.getActionById(dto.actionId),
      ]);

      action.approved = false;
      action.active = false;
      action.approvedBy = user.id;
      action.approvedTime = new Date();

      return await this.saveAction(action);
    } catch (error) {
      throw new Error(`Error during action request: ${error.message}`);
    }
  }

  /**
   * Saves an action entity to the database.
   * @param action - The action entity to save.
   * @returns The saved action with database-generated values.
   */
  async saveAction(action: Action): Promise<Action> {
    try {
      const savedAction = await this.actionsRepository.save(action);
      return savedAction;
    } catch (error) {
      throw new Error(`Error during saving action: ${error.message}`);
    }
  }

  /**
   * Retrieves an action by its ID.
   * @param actionId - The ID of the action to retrieve.
   * @returns The action entity if found.
   * @throws Error if action not found or retrieval fails.
   */
  async getActionById(actionId: number): Promise<Action> {
    try {
      const action = await this.actionsRepository.findOne({
        where: { id: actionId },
      });

      if (!action) throw new Error(`Action with ID ${actionId} not found`);

      return action;
    } catch (error) {
      throw new Error(`Error during getting action by id: ${error.message}`);
    }
  }

  /**
   * Retrieves all actions based on the provided parameters.
   * Different behavior for admin users vs. regular users.
   * @param request - The DTO containing filter and pagination parameters.
   * @returns Object containing matched actions and total count.
   */
  async getAllActions(
    request: GetAllActionsDto,
  ): Promise<{ actions: Action[]; count?: number }> {
    try {
      const { userId, type, active, page, limit } = request;
      const user: User = await this.getUserById(userId);
      if (user.role.name === RoleType.ADMIN) {
        const query: any = {
          active: active,
        };

        if (type) {
          query.type = type;
        }

        const [actions, count] = await this.actionsRepository.findAndCount({
          where: query,
          take: limit,
          skip: page * limit,
        });

        return { actions, count };
      }

      const query: any = {
        active: active,
        userId: user.id,
      };

      if (type) {
        query.type = type;
      }

      const [actions, count] = await this.actionsRepository.findAndCount({
        where: query,
        take: limit,
        skip: page * limit,
      });

      return { actions, count };
    } catch (error) {
      throw new Error(`Error during getting all actions: ${error.message}`);
    }
  }

  /**
   * Transfers an item from one user to another.
   * @param userGivingId - The ID of the user giving the item.
   * @param userGetId - The ID of the user receiving the item.
   * @param itemId - The ID of the item being transferred.
   * @param dto - Optional DTO for declining action if transfer fails.
   * @returns Boolean indicating whether the transfer was successful.
   * @private
   */
  private async giveItemUser(
    userGivingId: number,
    userGetId: number,
    itemId: number,
    dto?: ApproveActionDto,
  ) {
    try {
      const [user, userGet, item] = await Promise.all([
        this.getUserWithItems(userGivingId),
        this.getUserWithItems(userGetId),
        this.getItemWithUsers(itemId),
      ]);

      const hasUserItem = user.items.some((el) => el.id === item.id);

      if (!hasUserItem) {
        await this.declineAction(dto);
        return false;
      }

      userGet.items.push(item);
      item.users.push(userGet);
      item.users = item.users.filter((el) => el.id !== user.id);
      user.items = user.items.filter((el) => el.id !== item.id);

      await Promise.all([
        this.usersRepository.save(userGet),
        this.usersRepository.save(user),
        this.itemsRepository.save(item),
      ]);

      return true;
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  /**
   * Retrieves a user with their related items.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity with items relation loaded.
   * @private
   */
  private async getUserWithItems(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: { items: true },
    });
  }

  /**
   * Retrieves an item with its related users.
   * @param itemId - The ID of the item to retrieve.
   * @returns The item entity with users relation loaded.
   * @private
   */
  private async getItemWithUsers(itemId: number) {
    return this.itemsRepository.findOne({
      where: { id: itemId },
      relations: { users: true },
    });
  }

  /**
   * Allows an administrator to give an item to a user.
   * @param dto - The DTO containing admin, item, and user IDs.
   * @throws Error if the specified user is not an administrator.
   */
  async giveItemAdmin(dto: GiveItemDto) {
    try {
      const { adminId, itemId, userId } = dto;
      const user: User = await this.getUserById(adminId);

      if (user.role.name !== RoleType.ADMIN) {
        throw new Error('User is not Admin');
      }

      const [userGet, item] = await Promise.all([
        this.getUserWithItems(userId),
        this.getItemWithUsers(itemId),
      ]);

      userGet.items.push(item);
      item.users.push(userGet);

      await Promise.all([
        this.usersRepository.save(userGet),
        this.itemsRepository.save(item),
      ]);
    } catch (error) {
      throw new Error(`Error during giving item to user: ${error.message}`);
    }
  }

  /**
   * Retrieves all items based on the user's role.
   * Admins see all items, regular users see only their own.
   * @param request - The DTO containing the user ID.
   * @returns Array of items the user has access to.
   */
  async getAllItems(request: GetAllItems) {
    try {
      const { userId } = request;

      const user: User = await this.getUserById(userId);

      if (user.role.name === RoleType.ADMIN)
        return await this.getItemsForAdmin();

      return await this.getItemsForUser(userId);
    } catch (error) {
      throw new Error(`Error during getting all items: ${error.message}`);
    }
  }

  /**
   * Retrieves all items in the database for admin users.
   * @returns Array of all items.
   */
  async getItemsForAdmin(): Promise<Item[]> {
    try {
      const items = await this.itemsRepository.find();
      return items;
    } catch (error) {
      throw new Error(`Error during getting all items: ${error.message}`);
    }
  }

  /**
   * Retrieves all items owned by a specific user.
   * @param userId - The ID of the user whose items to retrieve.
   * @returns Array of items owned by the user.
   */
  async getItemsForUser(userId: number): Promise<Item[]> {
    try {
      const items = await this.itemsRepository.find({
        where: {
          users: {
            id: userId,
          },
        },
      });
      return items;
    } catch (error) {
      throw new Error(`Error during getting items for user: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their ID, including their role.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity with role relation loaded.
   * @throws Error if retrieval fails.
   */
  async getUserById(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error during getting user by id: ${error.message}`);
    }
  }
}
