import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user.' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'The username of the user.' })
  userName: string;

  @Column()
  @ApiProperty({ example: 'my_secret_password', description: 'The password of the user.' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-10T15:30:00Z', description: 'The date and time when the user was created.' })
  created_at: Date;
}
