import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import * as crypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { Token } from 'src/entities/token.entity';
import { CryptUserDto } from 'src/common/dtos/cryptUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async logIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect Email or Password',
      });
    }
    const isPasswordEquals = await crypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordEquals) {
      throw new UnauthorizedException({
        message: 'Incorrect Email or Password',
      });
    }
    const userPublic: CryptUserDto = {
      email: user.email,
      id: user.id,
      userName: user.userName,
      role: user.role,
    };
    const { accessToken, refreshToken } = await this.generateTokens(userPublic);
    await this.saveToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      userPublic,
    };
  }

  async logOut(refreshToken: string) {
    try {
      const token = await this.removeToken(refreshToken);
      return token;
    } catch (error) {
      throw new HttpException(
        'Error during logout',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeToken(refreshToken: string) {
    try {
      const token = await this.tokenRepository.findOne({
        where: {
          refreshToken,
        },
      });
      if (!token) {
        throw new UnauthorizedException({
          message: 'Token not found',
        });
      }
      await this.tokenRepository.remove(token);
      return token;
    } catch (error) {
      throw new HttpException(
        'Error during token removal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refresh(refreshToken: string) {
    try {
      const token = await this.tokenRepository.findOne({
        where: {
          refreshToken,
        },
      });
      if (!token) {
        throw new UnauthorizedException({
          message: 'Token not found',
        });
      }
      const userVerified = await this.validateRefreshToken(refreshToken);
      const tokenFromDb = await this.findToken(refreshToken);

      if (!userVerified || !tokenFromDb) {
        throw new UnauthorizedException({
          message: 'Incorrect token',
        });
      }
      const userNow = await this.usersRepository.findOne({
        where: {
          id: userVerified.id,
        },
        relations: {
          role: true,
        }
      });

      const userPublic: CryptUserDto = {
        email: userNow.email,
        id: userNow.id,
        userName: userNow.userName,
        role: userNow.role,
      };

      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(userPublic);

      await this.saveToken(userNow.id, newRefreshToken);
      return {
        accessToken,
        refreshToken: newRefreshToken,
        userPublic,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error during token refresh',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async findToken(token: string) {
    try {
      const tokenData = await this.tokenRepository.findOne({
        where: {
          refreshToken: token,
        },
      });
      return tokenData;
    } catch (error) {
      throw new HttpException(
        'Error during token search',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async validateRefreshToken(token: string) {
    try {
      const secret = process.env.PRIVATE_REFRESH_KEY;
      const user = await this.jwtService.verifyAsync(token, {
        secret,
      });
      return user;
    } catch (error) {
      console.log(error.message, 'error')
      throw new HttpException(
        'Error during token validation',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: userDto.email,
      },
      relations: {
        role: true,
      },
    });
    if (!user || !userDto) {
      throw new UnauthorizedException({
        message: 'Incorrect Email or Password',
      });
    }
    const passwordEquals = await crypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect Email or Password',
    });
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.usersRepository.findOneBy({
      email: userDto.email,
    });
    if (candidate) {
      throw new HttpException(
        'User with this email already existing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await crypt.hash(userDto.password, 5);
    const role = await this.rolesRepository.findOne({
      where: {
        id: userDto.roleId,
      },
    });
    const user = await this.usersRepository.save({
      ...userDto,
      password: hashPassword,
      role,
    });
    const userPublic: CryptUserDto = {
      email: user.email,
      id: user.id,
      userName: user.userName,
      role
    };
    const { accessToken, refreshToken } = await this.generateTokens(userPublic);
    await this.saveToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      userPublic,
    };
  }

  private async generateTokens(user: CryptUserDto) {
    const payload = {
      email: user.email,
      id: user.id,
      userName: user.userName,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_REFRESH_KEY,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: {
        userId,
      },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return this.tokenRepository.save(tokenData);
    }

    const token = await this.tokenRepository.save({
      refreshToken,
      userId,
    });
    return token;
  }
}
