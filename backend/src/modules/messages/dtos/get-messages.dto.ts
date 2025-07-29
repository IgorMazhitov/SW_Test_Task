import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class GetMessagesBetweenDto {
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
}
