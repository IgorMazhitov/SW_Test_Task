import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSORD_LENGTH,
} from '../constants/constants';

export class ChangeUserDto {
  @ApiProperty({
    description: 'The ID of the user',
    example: 1,
  })
  @IsNumber({}, { message: 'User Id should be number' })
  readonly id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString({ message: 'User name has to be a string' })
  readonly userName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com',
  })
  @IsString({ message: 'User email has to be a string' })
  @IsEmail({}, { message: 'User email is invalid' })
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString({ message: 'User password has to be a string' })
  @Length(MIN_PASSORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: 'User password should be more than 4 digits and less than 16',
  })
  readonly password: string;

  @ApiProperty({
    description: 'The role ID of the user',
    example: 1,
  })
  @IsNumber({}, { message: 'Role Id should be number' })
  readonly roleId: number;
}
