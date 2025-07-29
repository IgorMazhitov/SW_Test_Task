import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../entities/token.entity';
import { BaseService } from '../abstracts/base-service.abstract';
import { CryptUserDto } from '../dtos/cryptUser.dto';

/**
 * Helper service responsible for JWT token operations.
 * Manages creation, validation, storage, and removal of tokens.
 */
@Injectable()
export class TokenHelper extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {
    super();
  }

  /**
   * Generates access and refresh tokens for a user
   * @param user - User data to encode in the tokens
   * @returns Object containing access and refresh tokens
   */
  async generateTokens(user: CryptUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      email: user.email,
      id: user.id,
      userName: user.userName,
      role: user.role,
    };

    return await this.executeWithErrorHandling(
      async () => {
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.PRIVATE_KEY,
          expiresIn: '30m',
        });

        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.PRIVATE_REFRESH_KEY,
          expiresIn: '30d',
        });

        return { accessToken, refreshToken };
      },
      'Error generating tokens',
    );
  }

  /**
   * Saves or updates a refresh token in the database
   * @param userId - ID of the user associated with the token
   * @param refreshToken - Refresh token to save
   * @returns The saved token entity
   */
  async saveToken(userId: number, refreshToken: string): Promise<Token> {
    return await this.executeWithErrorHandling(
      async () => {
        const tokenData = await this.tokenRepository.findOne({
          where: { userId },
        });

        if (tokenData) {
          tokenData.refreshToken = refreshToken;
          return this.tokenRepository.save(tokenData);
        }

        return await this.tokenRepository.save({
          refreshToken,
          userId,
        });
      },
      'Error saving token',
    );
  }

  /**
   * Removes a refresh token from the database
   * @param refreshToken - The refresh token to remove
   * @returns The removed token entity
   */
  async removeToken(refreshToken: string): Promise<Token> {
    return await this.executeWithErrorHandling(
      async () => {
        const token = await this.findToken(refreshToken);
        if (!token) {
          throw new UnauthorizedException({ message: 'Token not found' });
        }
        
        await this.tokenRepository.remove(token);
        return token;
      },
      'Error during token removal',
    );
  }

  /**
   * Finds a token in the database by its value
   * @param refreshToken - The refresh token to find
   * @returns The found token entity or null
   */
  async findToken(refreshToken: string): Promise<Token> {
    return await this.executeWithErrorHandling(
      async () => {
        return await this.tokenRepository.findOne({
          where: { refreshToken },
        });
      },
      'Error finding token',
    );
  }

  /**
   * Validates a refresh token and returns the decoded user data
   * @param refreshToken - The refresh token to validate
   * @returns Decoded user data from the token
   */
  async validateRefreshToken(refreshToken: string): Promise<any> {
    return await this.executeWithErrorHandling(
      async () => {
        const secret = process.env.PRIVATE_REFRESH_KEY;
        return await this.jwtService.verifyAsync(refreshToken, { secret });
      },
      'Invalid or expired token',
    );
  }
}
