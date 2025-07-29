import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { TokenHelper } from 'src/common/services/token.helper';
import { UserAuthHelper } from 'src/common/services/user-auth.helper';
import { BaseService } from 'src/common/abstracts/base-service.abstract';
import { AuthResponseDto } from 'src/modules/auth/dtos/auth-response.dto';

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
    return await this.executeWithErrorHandling(
      async () => {
        // Validate user credentials
        const user = await this.userAuthHelper.validateUser(userDto);
        
        // Create sanitized user object
        const userPublic = this.userAuthHelper.createPublicUserDto(user);
        
        // Generate tokens
        const { accessToken, refreshToken } = await this.tokenHelper.generateTokens(userPublic);
        
        // Save refresh token
        await this.tokenHelper.saveToken(user.id, refreshToken);
        
        // Return response
        return {
          accessToken,
          refreshToken,
          userPublic,
        };
      },
      'Authentication failed',
    );
  }

  /**
   * Logs out a user by removing their refresh token
   * @param refreshToken - User's refresh token
   * @returns The removed token entity
   */
  async logOut(refreshToken: string) {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.tokenHelper.removeToken(refreshToken);
      },
      'Error during logout',
    );
  }

  /**
   * Refreshes the user's authentication tokens
   * @param refreshToken - Current refresh token
   * @returns New authentication response with fresh tokens
   */
  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    return await this.executeWithErrorHandling(
      async () => {
        // Check if token exists in database
        const token = await this.tokenHelper.findToken(refreshToken);
        if (!token) {
          throw new Error('Token not found');
        }
        
        // Validate the token and get user data
        const userVerified = await this.tokenHelper.validateRefreshToken(refreshToken);
        if (!userVerified) {
          throw new Error('Invalid token');
        }
        
        // Get the current user data with role
        const userNow = await this.userAuthHelper.getUserById(userVerified.id);
        
        // Create sanitized user object
        const userPublic = this.userAuthHelper.createPublicUserDto(userNow);
        
        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = 
          await this.tokenHelper.generateTokens(userPublic);
        
        // Save the new refresh token
        await this.tokenHelper.saveToken(userNow.id, newRefreshToken);
        
        // Return the new tokens and user info
        return {
          accessToken,
          refreshToken: newRefreshToken,
          userPublic,
        };
      },
      'Error during token refresh',
    );
  }

  /**
   * Registers a new user
   * @param userDto - User registration data
   * @returns Authentication response with tokens and user info
   */
  async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
    return await this.executeWithErrorHandling(
      async () => {
        // Create the user
        const user = await this.userAuthHelper.createUser(userDto);
        
        // Create sanitized user object
        const userPublic = this.userAuthHelper.createPublicUserDto(user);
        
        // Generate tokens
        const { accessToken, refreshToken } = await this.tokenHelper.generateTokens(userPublic);
        
        // Save refresh token
        await this.tokenHelper.saveToken(user.id, refreshToken);
        
        // Return response
        return {
          accessToken,
          refreshToken,
          userPublic,
        };
      },
      'Registration failed',
    );
  }


}
