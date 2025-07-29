import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BaseService } from '../abstracts/base-service.abstract';

/**
 * Helper service for user-related operations.
 * Centralizes common user retrieval patterns across the application.
 */
@Injectable()
export class UserHelper extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  /**
   * Retrieves a user by ID with optional relations.
   * @param userId - The ID of the user to retrieve
   * @param relations - Optional relations to include
   * @returns The user entity with requested relations
   */
  async getUserById(userId: number, relations: string[] = []): Promise<User> {
    return this.executeWithErrorHandling(
      async () => {
        const user = await this.usersRepository.findOne({
          where: { id: userId },
          relations: relations.reduce((acc, rel) => ({ ...acc, [rel]: true }), {}),
        });

        if (!user) {
          throw new Error(`User with ID ${userId} not found`);
        }

        return user;
      },
      `Error retrieving user with ID ${userId}`
    );
  }

  /**
   * Retrieves a user by email with optional relations.
   * @param email - The email of the user to retrieve
   * @param relations - Optional relations to include
   * @returns The user entity with requested relations
   */
  async getUserByEmail(email: string, relations: string[] = []): Promise<User> {
    return this.executeWithErrorHandling(
      async () => {
        const user = await this.usersRepository.findOne({
          where: { email },
          relations: relations.reduce((acc, rel) => ({ ...acc, [rel]: true }), {}),
        });

        if (!user) {
          throw new Error(`User with email ${email} not found`);
        }

        return user;
      },
      `Error retrieving user with email ${email}`
    );
  }

  /**
   * Gets a user by ID with their received messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their received messages
   */
  async getUserWithReceivedMessages(userId: number): Promise<User> {
    return this.getUserById(userId, ['receivedMessages']);
  }

  /**
   * Gets a user by ID with their sent messages
   * @param userId - ID of the user to retrieve
   * @returns The user with their sent messages
   */
  async getUserWithSentMessages(userId: number): Promise<User> {
    return this.getUserById(userId, ['sentMessages']);
  }

  /**
   * Retrieves a user with their related items.
   * @param userId - The ID of the user to retrieve
   * @returns The user entity with items relation loaded
   */
  async getUserWithItems(userId: number): Promise<User> {
    return this.getUserById(userId, ['items']);
  }

  /**
   * Retrieves a user with their role.
   * @param userId - The ID of the user to retrieve
   * @returns The user entity with role relation loaded
   */
  async getUserWithRole(userId: number): Promise<User> {
    return this.getUserById(userId, ['role']);
  }

  /**
   * Checks if a user exists by ID.
   * @param userId - The ID of the user to check
   * @returns True if the user exists, false otherwise
   */
  async userExists(userId: number): Promise<boolean> {
    return this.executeWithErrorHandling(
      async () => {
        const count = await this.usersRepository.count({
          where: { id: userId }
        });
        return count > 0;
      },
      `Error checking if user with ID ${userId} exists`
    );
  }
}
