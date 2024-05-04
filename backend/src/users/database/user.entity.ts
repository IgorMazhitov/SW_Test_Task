import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/database/role.entity';
import { Item } from '../../actions/database/item.entity';
import { Action } from 'src/actions/database/action.entity';
import { Message } from 'src/messages/database/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user.' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'The username of the user.' })
  userName: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'test@mail.com', description: 'The email of the user.' })
  email: string;

  @Column()
  @ApiProperty({ example: 'my_secret_password', description: 'The password of the user.' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-10T15:30:00Z', description: 'The date and time when the user was created.' })
  created_at: Date;

  @ManyToOne(() => Role, role => role.users)
  @ApiProperty({ type: () => Role, description: 'The role of the user.' })
  role: Role;

  @ManyToMany(() => Item, item => item.users)
  @JoinTable()
  @ApiProperty({ type: () => Item, isArray: true, description: 'The items owned by the user.' })
  items: Item[];

  @ManyToMany(() => Action)
  @JoinTable()
  @ApiProperty()
  actions: Action[];

  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[];
}
