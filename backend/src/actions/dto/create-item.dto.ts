import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item', example: 'Product A' })
  readonly name: string;

  @ApiProperty({ description: 'The description of the item', example: 'A description of Product A' })
  readonly description: string;
}

export class GiveItemDto {
  @ApiProperty({ description: 'The ID of the item', example: 1 })
  readonly itemId: number;

  @ApiProperty({ description: 'The ID of the user receiving the item', example: 1, required: false })
  readonly userId?: number;

  @ApiProperty({ description: 'The email of the user receiving the item', example: 'user@example.com', required: false })
  readonly userEmail?: string;
}
