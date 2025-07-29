import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const MAX_MESSAGE_LENGTH = 2000;

export class SendMessageDto {
  @ApiProperty({ example: 1, description: 'The ID of the sender.' })
  @IsNotEmpty({ message: 'Sender ID is required' })
  @IsInt({ message: 'Sender ID must be an integer' })
  @IsPositive({ message: 'Sender ID must be a positive integer' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the receiver.' })
  @IsNotEmpty({ message: 'Receiver ID is required' })
  @IsInt({ message: 'Receiver ID must be an integer' })
  @IsPositive({ message: 'Receiver ID must be a positive integer' })
  receiverId: number;

  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'The content of the message.',
  })
  @IsNotEmpty({ message: 'Message content is required' })
  @IsString({ message: 'Message content must be a string' })
  @MinLength(1, { message: 'Message content must not be empty' })
  @MaxLength(MAX_MESSAGE_LENGTH, {
    message: `Message content must not exceed ${MAX_MESSAGE_LENGTH} characters`,
  })
  content: string;
}
