import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 1, description: 'The ID of the sender.' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the receiver.' })
  receiverId: number;

  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'The content of the message.',
  })
  content: string;
}
