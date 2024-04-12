import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as crypt from 'bcryptjs';
import { User } from 'src/users/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/database/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
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
    const user = await this.usersService.getUserByEmail(userDto.email);
    console.log(user);
    const passwordEquals = await crypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect Email or Password',
    });
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already existing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await crypt.hash(userDto.password, 5);
    console.log('step', hashPassword);
    const role = await this.rolesRepository.findOne({
        where: {
            id: userDto.roleId
        }
    })
    const user = await this.usersRepository.save({
      ...userDto,
      password: hashPassword,
      role
    });
    console.log(user, 'user checked');
    const { token } = await this.generateToken(user);
    return {
      token,
      user,
    };
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
