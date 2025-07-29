import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, how are you?',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @ApiProperty({
    type: () => User,
    description: 'The user who sent the message',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @ApiProperty({
    type: () => User,
    description: 'The user who received the message',
  })
  receiver: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The timestamp when the message was sent',
    example: '2024-05-05T12:00:00Z',
  })
  timestamp: Date;
}
