import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesBetweenDto {
  @ApiProperty({ example: 1, description: 'The ID of the sender.' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the receiver.' })
  receiverId: number;
}
