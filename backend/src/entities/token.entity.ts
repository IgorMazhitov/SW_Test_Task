import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the token.',
  })
  id: number;

  @Column()
  @ApiProperty({ example: '123456', description: 'The token value.' })
  refreshToken: string;

  @Column()
  @ApiProperty({ example: '1', description: 'User id.' })
  userId: number;
}
