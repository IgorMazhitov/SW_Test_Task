import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { CreateUserDto } from '../../modules/users/dtos/create-user.dto';
import * as crypt from 'bcryptjs';
import { CryptUserDto } from '../dtos/cryptUser.dto';
import { BaseService } from '../abstracts/base-service.abstract';

/**
 * Helper service responsible for user authentication operations.
 * Manages user validation, registration, and credential checking.
 */
@Injectable()
export class UserAuthHelper extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    super();
  }

  /**
   * Validates user credentials
   * @param userDto - User credentials to validate
   * @returns The authenticated user if credentials are valid
   */
  async validateUser(userDto: CreateUserDto): Promise<User> {
    return await this.executeWithErrorHandling(async () => {
      const user = await this.usersRepository.findOne({
        where: { email: userDto.email },
        relations: { role: true },
      });

      if (!user || !userDto) {
        throw new UnauthorizedException({
          message: 'Incorrect Email or Password',
        });
      }

      const passwordEquals = await crypt.compare(
        userDto.password,
        user.password,
      );
      if (!passwordEquals) {
        throw new UnauthorizedException({
          message: 'Incorrect Email or Password',
        });
      }

      return user;
    }, 'Authentication failed');
  }

  /**
   * Creates a new user account
   * @param userDto - User data for registration
   * @returns The created user
   */
  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.executeWithErrorHandling(async () => {
      // Check if user already exists
      const candidate = await this.usersRepository.findOneBy({
        email: userDto.email,
      });

      if (candidate) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Hash the password
      const hashPassword = await crypt.hash(userDto.password, 5);

      // Find the role
      const role = await this.rolesRepository.findOne({
        where: { id: userDto.roleId },
      });

      // Save the user
      return await this.usersRepository.save({
        ...userDto,
        password: hashPassword,
        role,
      });
    }, 'Registration failed');
  }

  /**
   * Gets a user by their ID with role information
   * @param userId - ID of the user to retrieve
   * @returns The user with role information
   */
  async getUserById(userId: number): Promise<User> {
    return await this.executeWithErrorHandling(async () => {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: { role: true },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    }, 'Error retrieving user');
  }

  /**
   * Creates a sanitized user DTO without sensitive data
   * @param user - User entity to convert
   * @returns User DTO with public information only
   */
  createPublicUserDto(user: User): CryptUserDto {
    return {
      email: user.email,
      id: user.id,
      userName: user.userName,
      role: user.role,
    };
  }
}
