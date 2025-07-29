import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item', example: 'Product A' })
  @IsString({ message: 'Item name should be string' })
  readonly name: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'A description of Product A',
  })
  @IsString({ message: 'Item description should be string' })
  readonly description: string;
}

export class GiveItemDto {
  @ApiProperty({ description: 'The ID of the admin', example: 1 })
  @IsNumber({}, { message: 'Admin id should be number' })
  readonly adminId: number;

  @ApiProperty({ description: 'The ID of the item', example: 1 })
  @IsNumber({}, { message: 'Item id should be number' })
  readonly itemId: number;

  @ApiProperty({
    description: 'The ID of the user receiving the item',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId?: number;

  @ApiProperty({
    description: 'The email of the user receiving the item',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'User email should be a valid email' })
  readonly userEmail?: string;
}
