import { Injectable } from '@nestjs/common';
import { CreateItemDto, GiveItemDto } from './dtos/create-item.dto';
import { Item } from '../../entities/item.entity';
import { 
  ActionRequestDto,
  ApproveActionDto,
  GetAllActionsDto,
} from './dtos/action-request.dto';
import { Action } from '../../entities/action.entity';
import { RoleType } from 'src/entities/role.entity';
import { ItemHelper } from 'src/application/helpers/item.helper';
import { ActionHelper } from 'src/application/helpers/action.helper';
import { ActionHandlerService } from 'src/application/helpers/action-handler.service';

/**
 * Facade service that provides a unified API for the actions module.
 * Delegates to specialized services to handle specific responsibilities.
 */
@Injectable()
export class ActionsService {
  constructor(
    private readonly itemHelper: ItemHelper,
    private readonly actionHelper: ActionHelper,
    private readonly actionHandlerService: ActionHandlerService
  ) {}

  /**
   * Creates a new item in the database.
   * @param dto - The data transfer object containing item details.
   * @returns The created item.
   */
  async createItem(dto: CreateItemDto): Promise<Item> {
    return await this.itemHelper.createItem(dto);
  }

  /**
   * Creates a new action request in the database.
   * @param dto - The data transfer object containing action request details.
   * @returns The created action.
   */
  async requestAction(dto: ActionRequestDto): Promise<Action> {
    return await this.actionHelper.requestAction(dto);
  }

  /**
   * Approves an action by updating its status and handling it according to its type.
   * @param dto - The data transfer object containing approval details.
   * @returns The updated action with approval information.
   */
  async approveAction(dto: ApproveActionDto): Promise<Action> {
    return await this.actionHandlerService.approveAction(dto);
  }

  /**
   * Declines an action by updating its status.
   * @param dto - The data transfer object containing decline details.
   * @returns The updated action with decline information.
   */
  async declineAction(dto: ApproveActionDto): Promise<Action> {
    return await this.actionHandlerService.declineAction(dto);
  }

  /**
   * Retrieves an action by its ID.
   * @param actionId - The ID of the action to retrieve.
   * @returns The action entity if found.
   */
  async getActionById(actionId: number): Promise<Action> {
    return await this.actionHelper.getActionById(actionId);
  }

  /**
   * Retrieves all actions based on the provided parameters.
   * @param request - The DTO containing filter and pagination parameters.
   * @returns Object containing matched actions and total count.
   */
  async getAllActions(
    request: GetAllActionsDto,
  ): Promise<{ actions: Action[]; count?: number }> {
    return await this.actionHelper.getAllActions(request);
  }

  /**
   * Allows an administrator to give an item to a user.
   * @param dto - The DTO containing admin, item, and user IDs.
   */
  async giveItemAdmin(dto: GiveItemDto): Promise<void> {
    const { adminId, userId, itemId } = dto;
    await this.itemHelper.giveItemToUser(adminId, userId, itemId);
  }

  /**
   * Retrieves all items based on the user's role.
   * @param userId - The ID of the user requesting items.
   * @returns Array of items the user has access to.
   */
  async getAllItems(userId: number): Promise<Item[]> {
    const user = await this.actionHelper.getUserById(userId);
    
    if (user.role && user.role.name === RoleType.ADMIN) {
      return await this.itemHelper.getItemsForAdmin();
    }
    
    return await this.itemHelper.getItemsForUser(userId);
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity.
   */
  async getUserById(userId: number) {
    return await this.actionHelper.getUserById(userId);
  }
}
