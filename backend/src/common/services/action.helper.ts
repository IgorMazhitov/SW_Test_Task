import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../abstracts/base-service.abstract';
import { Action } from 'src/entities/action.entity';
import { Repository } from 'typeorm';
import { ActionRequestDto, GetAllActionsDto } from 'src/modules/actions/dtos/action-request.dto';
import { User } from 'src/entities/user.entity';
import { RoleType } from 'src/entities/role.entity';

@Injectable()
export class ActionHelper extends BaseService {
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super();
  }

  /**
   * Creates a new action request in the database.
   * @param dto - The data transfer object containing action request details.
   * @returns The created action.
   */
  async requestAction(dto: ActionRequestDto): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      const action = new Action();
      action.userId = dto.userId;
      action.type = dto.type;
      action.text = dto.description;
      action.itemId = dto.itemId;
      action.userGetId = dto.userGetId;
      action.requestedTime = new Date();
      action.active = true;

      return await this.actionsRepository.save(action);
    }, 'Error during action request');
  }

  /**
   * Saves an action entity to the database.
   * @param action - The action entity to save.
   * @returns The saved action with database-generated values.
   */
  async saveAction(action: Action): Promise<Action> {
    return this.executeWithErrorHandling(
      () => this.actionsRepository.save(action),
      'Error during saving action'
    );
  }

  /**
   * Retrieves an action by its ID.
   * @param actionId - The ID of the action to retrieve.
   * @returns The action entity if found.
   * @throws Error if action not found.
   */
  async getActionById(actionId: number): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      const action = await this.actionsRepository.findOne({
        where: { id: actionId },
      });

      if (!action) throw new Error(`Action with ID ${actionId} not found`);

      return action;
    }, 'Error during getting action by id');
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
    return this.executeWithErrorHandling(async () => {
      const { userId, type, active, page, limit } = request;
      const user: User = await this.getUserById(userId);
      
      const query: any = {
        active: active,
      };

      if (!user.role || user.role.name !== RoleType.ADMIN) {
        query.userId = user.id;
      }

      if (type) {
        query.type = type;
      }

      const [actions, count] = await this.actionsRepository.findAndCount({
        where: query,
        take: limit,
        skip: page * limit,
      });

      return { actions, count };
    }, 'Error during getting all actions');
  }

  /**
   * Updates an action's status to declined.
   * @param action - The action to decline.
   * @param userId - The ID of the user declining the action.
   */
  async declineAction(action: Action, userId: number): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      action.approved = false;
      action.active = false;
      action.approvedBy = userId;
      action.approvedTime = new Date();

      return await this.actionsRepository.save(action);
    }, 'Error during action decline');
  }

  /**
   * Marks an action as approved.
   * @param action - The action to approve.
   * @param userId - The ID of the user approving the action.
   */
  async markActionApproved(action: Action, userId: number): Promise<Action> {
    return this.executeWithErrorHandling(async () => {
      action.approved = true;
      action.active = false;
      action.approvedBy = userId;
      action.approvedTime = new Date();

      return await this.actionsRepository.save(action);
    }, 'Error during action approval');
  }

  /**
   * Retrieves a user by their ID, including their role.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity with role relation loaded.
   */
  async getUserById(userId: number): Promise<User> {
    return this.executeWithErrorHandling(() => {
      return this.usersRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          role: true,
        },
      });
    }, 'Error during getting user by id');
  }
}
