import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export enum ActionType {
  TYPE_1 = 'item',
  TYPE_2 = 'message',
  TYPE_3 = 'type_3',
}

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the action',
    example: 1,
  })
  id: number;

  @Column({ type: 'enum', enum: ActionType })
  @ApiProperty({
    enum: ActionType,
    enumName: 'ActionType',
    description: 'The type of action',
    example: 'item',
  })
  type: ActionType;

  @Column()
  @ApiProperty({
    description: 'The ID of the user who initiated the action',
    example: 123,
  })
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The timestamp when the action was requested',
    example: '2024-05-05T12:00:00Z',
  })
  requestedTime: Date;

  @Column({ default: true })
  @ApiProperty({
    description: 'A boolean indicating if the action is currently active',
    example: true,
  })
  active: boolean;

  @Column({ default: false })
  @ApiProperty({
    description: 'A boolean indicating if the action has been approved',
    example: false,
  })
  approved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'The timestamp when the action was approved',
    example: '2024-05-05T12:30:00Z',
    nullable: true,
  })
  approvedTime?: Date;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the user who approved the action',
    example: 456,
    nullable: true,
  })
  approvedBy?: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the item related to the action',
    example: 789,
    nullable: true,
  })
  itemId?: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Additional text related to the action',
    example: 'Some additional text',
    nullable: true,
  })
  text?: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the user who received the action',
    example: 789,
    nullable: true,
  })
  userGetId?: number;

  @ManyToMany(() => User)
  @JoinTable()
  @ApiProperty({
    type: () => User,
    isArray: true,
    description: 'An array of users related to the action',
    example: [{ id: 1, name: 'John' }],
  })
  users: User[];
}
