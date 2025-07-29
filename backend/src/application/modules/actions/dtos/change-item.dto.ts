import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChangeItemDto {
  @ApiProperty({ description: 'The ID of the item', example: 1 })
  @IsNumber({}, { message: 'Item Id should be number' })
  readonly id: number;

  @ApiProperty({ description: 'The new name of the item', example: 'New Name' })
  @IsString({ message: 'Item name should be string' })
  readonly name: string;

  @ApiProperty({
    description: 'The new description of the item',
    example: 'New Description',
  })
  @IsString({ message: 'Item description should be string' })
  readonly description: string;
}
