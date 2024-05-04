import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the role.',
  })
  id: number;

  @Column()
  @ApiProperty({ example: 'admin', description: 'The name of the role.' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2022-04-10T15:30:00Z',
    description: 'The date and time when the role was created.',
  })
  created_at: Date;

  @OneToMany(() => User, (user) => user.role)
  @ApiProperty({
    type: () => User,
    description: 'The users who have this role.',
  })
  users: User[];
}