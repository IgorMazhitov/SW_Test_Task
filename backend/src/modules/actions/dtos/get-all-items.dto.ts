import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetAllItems {
  @ApiProperty({ example: 1, description: 'The user ID to retrieve items for.' })
  @IsNumber({}, { message: 'User ID should be a number' })
  readonly userId: number;
}
