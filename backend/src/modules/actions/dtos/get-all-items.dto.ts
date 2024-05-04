import { ApiProperty } from '@nestjs/swagger';

export class GetAllItems {
  @ApiProperty({ example: 1, description: 'The user ID to retrieve items for.' })
  readonly userId: number;
}
