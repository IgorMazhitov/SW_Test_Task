import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstracts/base-service.abstract';
import { Action, ActionType } from 'src/entities/action.entity';
import { ItemHelper } from '../../common/services/item.helper';
import { MessagesService } from 'src/application/modules/messages/messages.service';
import { SendMessageDto } from 'src/application/modules/messages/dtos/send-message.dto';
import { ActionHelper } from '../../common/services/action.helper';
import { ApproveActionDto } from 'src/application/modules/actions/dtos/action-request.dto';
import { IHandleAction } from 'src/domain/interfaces/actions.interface';

@Injectable()
export class ActionHandlerService extends BaseService {
  constructor(
    private itemHelper: ItemHelper,
    private messageService: MessagesService,
    private actionHelper: ActionHelper,
  ) {
    super();
  }

  /**
   * Routes an action to the appropriate handler based on its type.
   * @param params - The action parameters containing the action and DTO.
   * @returns The result of the appropriate handler.
   */
  async handleAction(params: IHandleAction): Promise<Action | null> {
    return this.executeWithErrorHandling(async () => {
      const { action, dto } = params;
      
      switch (action.type) {
        case ActionType.TYPE_1:
          return await this.handleItemAction(params);
        case ActionType.TYPE_2:
          return await this.handleMessageAction(params);
        default:
          throw new Error(`Unknown action type: ${action.type}`);
      }
    }, 'Error handling action');
  }

  /**
   * Handles a message-type action by sending a message from one user to another.
   * @param params - The action parameters containing the action details.
   * @returns The action if the message could not be sent, null otherwise.
   */
  private async handleMessageAction(params: IHandleAction): Promise<Action | null> {
    return this.executeWithErrorHandling(async () => {
      const { action } = params;

      const request: SendMessageDto = {
        senderId: action.userId,
        receiverId: action.userGetId,
        content: action.text,
      };
      
      const message = await this.messageService.sendMessageFromAdmin(request);

      if (!message) {
        return action;
      }
      
      return null;
    }, 'Error handling message action');
  }

  /**
   * Handles an item-type action by transferring an item from one user to another.
   * @param params - The action parameters containing the action and DTO.
   * @returns The action if the transaction could not be completed, null otherwise.
   */
  private async handleItemAction(params: IHandleAction): Promise<Action | null> {
    return this.executeWithErrorHandling(async () => {
      const { action, dto } = params;

      const transactionStatus = await this.itemHelper.transferItemBetweenUsers(
        action.userId,
        action.userGetId,
        action.itemId,
      );

      if (!transactionStatus) {
        if (dto) {
          await this.actionHelper.declineAction(action, dto.userId);
        }
        return action;
      }
      
      return null;
    }, 'Error handling item action');
  }

  /**
   * Approves an action by updating its status and handling it according to its type.
   * @param dto - The data transfer object containing approval details.
   * @returns The updated action with approval information.
   */
  async approveAction(dto: ApproveActionDto): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      const [user, action] = await Promise.all([
        this.actionHelper.getUserById(dto.userId),
        this.actionHelper.getActionById(dto.actionId),
      ]);

      const response = await this.handleAction({ action, dto });

      if (response) {
        // If handleAction returns the action, it means the action couldn't be completed
        return response;
      }

      // Mark as approved and save
      return await this.actionHelper.markActionApproved(action, user.id);
    }, 'Error approving action');
  }

  /**
   * Declines an action by updating its status.
   * @param dto - The data transfer object containing decline details.
   * @returns The updated action with decline information.
   */
  async declineAction(dto: ApproveActionDto): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      const [user, action] = await Promise.all([
        this.actionHelper.getUserById(dto.userId),
        this.actionHelper.getActionById(dto.actionId),
      ]);

      return await this.actionHelper.declineAction(action, user.id);
    }, 'Error declining action');
  }
}
