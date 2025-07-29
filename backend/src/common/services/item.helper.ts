import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../abstracts/base-service.abstract";
import { Item } from "src/entities/item.entity";
import { User } from "src/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateItemDto } from "src/modules/actions/dtos/create-item.dto";
import { UserHelper } from "./user.helper";

@Injectable()
export class ItemHelper extends BaseService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private readonly userHelper: UserHelper,
    private dataSource: DataSource
  ) {
    super();
  }
  
  /**
   * Creates a new item in the database.
   * @param dto - The data transfer object containing item details.
   * @returns The created item.
   */
  async createItem(dto: CreateItemDto): Promise<Item> {
    return this.executeWithErrorHandling(
      () => this.itemsRepository.save(dto),
      'Error during item creation'
    );
  }
  
  /**
   * Transfers an item from one user to another.
   * @param fromUserId - The ID of the user giving the item.
   * @param toUserId - The ID of the user receiving the item.
   * @param itemId - The ID of the item being transferred.
   * @returns Boolean indicating whether the transfer was successful.
   */
  /**
   * Transfers an item from one user to another.
   * @param fromUserId - The ID of the user giving the item.
   * @param toUserId - The ID of the user receiving the item.
   * @param itemId - The ID of the item being transferred.
   * @returns Boolean indicating whether the transfer was successful.
   */
  async transferItemBetweenUsers(
    fromUserId: number, 
    toUserId: number, 
    itemId: number
  ): Promise<boolean> {
    return this.executeWithErrorHandling(async () => {
      return await this.dataSource.transaction(async manager => {
        const userRepo = manager.getRepository(User);
        const itemRepo = manager.getRepository(Item);
        
        const [fromUser, toUser, item] = await Promise.all([
          userRepo.findOne({ 
            where: { id: fromUserId },
            relations: { items: true }
          }),
          userRepo.findOne({ 
            where: { id: toUserId },
            relations: { items: true }
          }),
          itemRepo.findOne({ 
            where: { id: itemId },
            relations: { users: true }
          })
        ]);
        
        if (!fromUser || !toUser || !item) {
          return false;
        }
        
        const hasUserItem = fromUser.items.some(el => el.id === item.id);
        if (!hasUserItem) {
          return false;
        }
        
        toUser.items.push(item);
        item.users.push(toUser);
        item.users = item.users.filter(el => el.id !== fromUser.id);
        fromUser.items = fromUser.items.filter(el => el.id !== item.id);
        
        await Promise.all([
          userRepo.save(toUser),
          userRepo.save(fromUser),
          itemRepo.save(item),
        ]);
        
        return true;
      });
    }, 'Error during item transfer');
  }
  
  /**
   * Retrieves a user with their related items.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity with items relation loaded.
   */
  async getUserWithItems(userId: number): Promise<User> {
    return this.executeWithErrorHandling(
      () => this.userHelper.getUserWithItems(userId),
      'Error retrieving user with items'
    );
  }

  /**
   * Retrieves an item with its related users.
   * @param itemId - The ID of the item to retrieve.
   * @returns The item entity with users relation loaded.
   */
  async getItemWithUsers(itemId: number): Promise<Item> {
    return this.executeWithErrorHandling(
      () => this.itemsRepository.findOne({
        where: { id: itemId },
        relations: { users: true },
      }),
      'Error retrieving item with users'
    );
  }
  
  /**
   * Allows an administrator to give an item to a user.
   * @param adminId - The ID of the admin giving the item.
   * @param userId - The ID of the user receiving the item.
   * @param itemId - The ID of the item to give.
   */
  async giveItemToUser(adminId: number, userId: number, itemId: number): Promise<void> {
    return this.executeWithErrorHandling(async () => {
      return await this.dataSource.transaction(async manager => {
        const userRepo = manager.getRepository(User);
        const itemRepo = manager.getRepository(Item);
        
        const [toUser, item] = await Promise.all([
          userRepo.findOne({ 
            where: { id: userId }, 
            relations: { items: true } 
          }),
          itemRepo.findOne({ 
            where: { id: itemId }, 
            relations: { users: true } 
          })
        ]);
        
        if (!toUser || !item) {
          throw new Error("User or item not found");
        }
        
        toUser.items.push(item);
        item.users.push(toUser);
        
        await Promise.all([
          userRepo.save(toUser),
          itemRepo.save(item),
        ]);
      });
    }, 'Error giving item to user');
  }
  
  /**
   * Retrieves all items in the database for admin users.
   * @returns Array of all items.
   */
  async getItemsForAdmin(): Promise<Item[]> {
    return this.executeWithErrorHandling(
      () => this.itemsRepository.find(),
      'Error getting items for admin'
    );
  }

  /**
   * Retrieves all items owned by a specific user.
   * @param userId - The ID of the user whose items to retrieve.
   * @returns Array of items owned by the user.
   */
  async getItemsForUser(userId: number): Promise<Item[]> {
    return this.executeWithErrorHandling(
      () => this.itemsRepository.find({
        where: { users: { id: userId } }
      }),
      'Error getting items for user'
    );
  }
}
