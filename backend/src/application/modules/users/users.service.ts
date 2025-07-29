import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ChangeUserDto } from './dtos/change-user.dto';
import * as crypt from 'bcryptjs';
import { GetAllUsersDto } from './dtos/get-all-users.dto';
import { BaseService } from '../../abstracts/base-service.abstract';
import { UserHelper } from '../../helpers/user.helper';
import { RoleHelper } from '../../helpers/role.helper';
import { IPaginatedUsersResponse, IUserResponse } from '../../../domain/interfaces/user-response.interface';
import { User } from 'src/domain/entities/user.entity';
import { Role, RoleType } from 'src/domain/entities/role.entity';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userHelper: UserHelper,
    private readonly roleHelper: RoleHelper
  ) {
    super();
  }

  /**
   * Creates a new user
   * @param dto - User data for creation
   * @returns The newly created user
   */
  async createUser(dto: CreateUserDto): Promise<IUserResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        try {
          await this.userHelper.getUserByEmail(dto.email);
          throw new HttpException(
            'User with this email already exists',
            HttpStatus.BAD_REQUEST
          );
        } catch (error) {
          if (error instanceof HttpException) {
            throw error;
          }
        }

        let role: Role = null;
        if (dto.roleId) {
          role = await this.roleHelper.getRoleById(dto.roleId);
        } else {
          role = await this.roleHelper.getUserRole();
        }

        const hashPassword = await crypt.hash(dto.password, 5);
        const newUser = await this.usersRepository.save({
          ...dto,
          password: hashPassword,
          role,
        });
        
        return {
          id: newUser.id,
          userName: newUser.userName,
          email: newUser.email,
          role: {
            id: role.id,
            name: role.name
          }
        };
      },
      'Error during user creation'
    );
  }

  /**
   * Updates an existing user
   * @param dto - User data for update
   * @returns The updated user
   */
  async changeUser(dto: ChangeUserDto): Promise<IUserResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const user: User = await this.userHelper.getUserWithRole(dto.id);
        const roleToChange: Role = await this.roleHelper.getRoleById(dto.roleId);

        const userToUpdate: Partial<User> = {};

        if (dto.userName !== user.userName) {
          userToUpdate.userName = dto.userName;
        }

        if (dto.email !== user.email) {
          try {
            const existingUser = await this.userHelper.getUserByEmail(dto.email);
            if (existingUser.id !== user.id) {
              throw new HttpException(
                'Email already in use by another user',
                HttpStatus.BAD_REQUEST
              );
            }
          } catch (error) {
            if (!error.message.includes('not found')) {
              throw error;
            }
          }
          userToUpdate.email = dto.email;
        }

        if (dto.password !== user.password) {
          userToUpdate.password = await crypt.hash(dto.password, 5);
        }

        if (dto.roleId !== user.role.id) {
          userToUpdate.role = roleToChange;
        }

        const updatedUser = await this.usersRepository.save({
          ...user,
          ...userToUpdate,
        });
        
        return {
          id: updatedUser.id,
          userName: updatedUser.userName,
          email: updatedUser.email,
          role: {
            id: updatedUser.role.id,
            name: updatedUser.role.name
          }
        };
      },
      'Error updating user'
    );
  }

  /**
   * Retrieves paginated users filtered by role
   * @param body - Query parameters for pagination and filtering
   * @returns Paginated users with count
   */
  async getAllUsers(body: GetAllUsersDto): Promise<IPaginatedUsersResponse> {
    return await this.executeWithErrorHandling(
      async () => {
        const { limit, page, senderId, roleId } = body;
        const user: User = await this.userHelper.getUserWithRole(senderId);
        
        const skip = (page - 1) * limit;
        const isAdmin = user.role.name === RoleType.ADMIN;

        const selectFields = isAdmin ? 
          {
            id: true,
            userName: true,
            role: { name: true },
            email: true,
          } :
          {
            userName: true,
            id: true,
            role: { name: true, id: true },
          };

        const [fetchedUsers, fetchedCount] = await this.usersRepository.findAndCount({
          where: {
            id: Not(user.id),
            role: { id: roleId },
          },
          select: selectFields,
          relations: { role: true },
          skip,
          take: limit,
        });
        
        const userResponses: IUserResponse[] = fetchedUsers.map(user => ({
          id: user.id,
          userName: user.userName,
          email: user.email,
          role: {
            id: user.role.id,
            name: user.role.name
          }
        }));

        return { 
          users: userResponses, 
          count: fetchedCount 
        };
      },
      'Error retrieving users'
    );
  }

  /**
   * Retrieves a user by their email address with role information
   * @param email - Email address to search for
   * @returns The user with role information
   */
  async getUserByEmail(email: string): Promise<User> {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.userHelper.getUserByEmail(email, ['role']);
      }, 
      `Error retrieving user by email: ${email}`
    );
  }

  /**
   * Retrieves a user by their ID with role information
   * @param id - User ID to search for
   * @returns The user with role information
   */
  async getUserById(id: number): Promise<User> {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.userHelper.getUserWithRole(id);
      },
      `Error retrieving user with ID: ${id}`
    );
  }

  /**
   * Retrieves a role by its ID
   * @param id - Role ID to search for
   * @returns The role entity
   */
  async getRoleById(id: number): Promise<Role> {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.roleHelper.getRoleById(id);
      },
      `Error retrieving role with ID: ${id}`
    );
  }

  /**
   * Retrieves the default user role
   * @returns The user role entity
   */
  async getUserRole(): Promise<Role> {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.roleHelper.getUserRole();
      },
      'Error retrieving user role'
    );
  }
}
