import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/database/user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the item.' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Example Item', description: 'The name of the item.' })
  name: string;

  @Column()
  @ApiProperty({ example: 'An example item description.', description: 'The description of the item.' })
  description: string;

  @ManyToMany(() => User, user => user.items)
  @JoinTable()
  @ApiProperty({ type: () => User, isArray: true, description: 'The users who have this item.' })
  users: User[];
}
