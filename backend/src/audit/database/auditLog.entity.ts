import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'request' or 'response'

  @Column({ type: 'jsonb' })
  requestData: any; // Store request data as JSON

  @Column({ type: 'jsonb', nullable: true })
  responseData: any; // Store response data as JSON, nullable in case of request logs

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp of when the log entry was created
}
