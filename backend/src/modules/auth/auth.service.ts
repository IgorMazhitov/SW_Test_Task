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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async logIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const { token } = await this.generateToken(user);
    return {
      token,
      user,
    };
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
    this.validateEmail(userDto.email);
    this.validatePassword(userDto.password);
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
    const { token } = await this.generateToken(user);
    return {
      token,
      user,
    };
  }

  private validateEmail(email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegexp.test(email)) {
      throw new HttpException('Email is invalid', HttpStatus.BAD_REQUEST);
    }
  }

  private validatePassword(password: string) {
    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    if (password.length < 4) {
      throw new HttpException('Password is too short', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
