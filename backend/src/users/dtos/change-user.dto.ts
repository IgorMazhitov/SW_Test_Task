import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class ChangeUserDto {
  @IsNumber({}, { message: 'User Id should be number' })
  readonly id: number;
  @IsString({ message: 'User name has to be a string' })
  readonly userName: string;
  @IsString({ message: 'User email has to be a string' })
  @IsEmail({}, { message: 'User email is invalid' })
  readonly email: string;
  @IsString({ message: 'User password has to be a string' })
  @Length(4, 16, {
    message: 'User password should be more than 4 digits and less than 16',
  })
  readonly password: string;
  @IsNumber({}, { message: 'Role Id should be number' })
  readonly roleId: number;
}
