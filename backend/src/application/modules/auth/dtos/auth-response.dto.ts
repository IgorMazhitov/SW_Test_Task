import { CryptUserDto } from 'src/application/dtos/cryptUser.dto';

/**
 * Data transfer object for authentication response
 * Contains tokens and user information
 */
export class AuthResponseDto {
  /**
   * JWT access token
   */
  accessToken: string;

  /**
   * JWT refresh token
   */
  refreshToken: string;

  /**
   * Public user information (without sensitive data)
   */
  userPublic: CryptUserDto;
}
