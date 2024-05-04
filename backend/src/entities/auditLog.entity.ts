import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the audit log entry',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The type of the audit log entry',
    example: 'user_login',
  })
  type: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The email associated with the audit log entry',
    example: 'john.doe@example.com',
  })
  email: string;

  @Column({ type: 'jsonb' })
  @ApiProperty({
    description: 'The request data associated with the audit log entry',
    example: { method: 'GET', path: '/api/users' },
  })
  requestData: any;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({
    description: 'The response data associated with the audit log entry',
    example: { status: 200, data: {} },
    nullable: true,
  })
  responseData: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The timestamp when the audit log entry was created',
    example: '2024-05-05T12:00:00Z',
  })
  createdAt: Date;
}
