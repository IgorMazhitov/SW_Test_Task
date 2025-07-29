import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsInt, IsString } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class CryptUserDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user.',
  })
  @IsDefined()
  @IsInt({ message: 'ID must be an integer.' })
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user.',
  })
  @IsDefined()
  @IsString({ message: 'Username must be a string.' })
  userName: string;

  @ApiProperty({
    example: 'my@gmail.com',
    description: 'The email of the user.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsDefined()
  email: string;

  @ApiProperty({
    example: 'admin',
    description: 'The role of the user.',
  })
  @IsDefined()
  role: Role;
}
