import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/modules/users/dtos/create-user.dto';
import { TokenHelper } from 'src/application/helpers/token.helper';
import { UserAuthHelper } from 'src/application/helpers/user-auth.helper';
import { BaseService } from 'src/application/abstracts/base-service.abstract';
import { AuthResponseDto } from 'src/application/modules/auth/dtos/auth-response.dto';

/**
 * Service responsible for authentication-related operations.
 * Acts as a facade for user authentication workflows.
 */
@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly tokenHelper: TokenHelper,
    private readonly userAuthHelper: UserAuthHelper,
  ) {
    super();
  }

  /**
   * Authenticates a user with email and password
   * @param userDto - User credentials
   * @returns Authentication response containing tokens and user info
   */
  async logIn(userDto: CreateUserDto): Promise<AuthResponseDto> {
    return await this.executeWithErrorHandling(async () => {
      const user = await this.userAuthHelper.validateUser(userDto);

      const userPublic = this.userAuthHelper.createPublicUserDto(user);

      const { accessToken, refreshToken } =
        await this.tokenHelper.generateTokens(userPublic);

      await this.tokenHelper.saveToken(user.id, refreshToken);

      return {
        accessToken,
        refreshToken,
        userPublic,
      };
    }, 'Authentication failed');
  }

  /**
   * Logs out a user by removing their refresh token
   * @param refreshToken - User's refresh token
   * @returns The removed token entity
   */
  async logOut(refreshToken: string) {
    return await this.executeWithErrorHandling(async () => {
      return await this.tokenHelper.removeToken(refreshToken);
    }, 'Error during logout');
  }

  /**
   * Refreshes the user's authentication tokens
   * @param refreshToken - Current refresh token
   * @returns New authentication response with fresh tokens
   */
  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    return await this.executeWithErrorHandling(async () => {
      const token = await this.tokenHelper.findToken(refreshToken);
      if (!token) {
        throw new Error('Token not found');
      }

      const userVerified =
        await this.tokenHelper.validateRefreshToken(refreshToken);
      if (!userVerified) {
        throw new Error('Invalid token');
      }

      const userNow = await this.userAuthHelper.getUserById(userVerified.id);

      const userpublic = this.userAuthHelper.createPublicUserDto(userNow);

      const { accessToken, refreshToken: newRefreshToken } =
        await this.tokenHelper.generateTokens(userpublic);

      await this.tokenHelper.saveToken(userNow.id, newRefreshToken);

      return {
        accessToken,
        refreshToken: newRefreshToken,
        userPublic: userpublic,
      };
    }, 'Error during token refresh');
  }

  /**
   * Registers a new user
   * @param userDto - User registration data
   * @returns Authentication response with tokens and user info
   */
  async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
    return await this.executeWithErrorHandling(async () => {
      const user = await this.userAuthHelper.createUser(userDto);

      const userPublic = this.userAuthHelper.createPublicUserDto(user);

      const { accessToken, refreshToken } =
        await this.tokenHelper.generateTokens(userPublic);

      await this.tokenHelper.saveToken(user.id, refreshToken);

      return {
        accessToken,
        refreshToken,
        userPublic,
      };
    }, 'Registration failed');
  }
}
