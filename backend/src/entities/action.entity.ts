// action.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export enum ActionType {
  TYPE_1 = 'item',
  TYPE_2 = 'message',
  TYPE_3 = 'type_3',
}

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'enum', enum: ActionType })
  @ApiProperty()
  type: ActionType;

  @Column()
  @ApiProperty()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  requestedTime: Date;

  @Column({ default: true})
  @ApiProperty()
  active: boolean

  @Column({ default: false })
  @ApiProperty()
  approved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  approvedTime?: Date;

  @Column({ nullable: true })
  @ApiProperty()
  approvedBy?: number;

  @Column({ nullable: true })
  @ApiProperty()
  itemId?: number;

  @Column({ nullable: true })
  @ApiProperty()
  text?: string;

  @Column({ nullable: true })
  @ApiProperty()
  userGetId?: number;

  @ManyToMany(() => User)
  @JoinTable()
  @ApiProperty()
  users: User[];
}
