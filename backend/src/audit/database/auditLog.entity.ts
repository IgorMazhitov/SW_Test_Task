import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb' })
  requestData: any; 

  @Column({ type: 'jsonb', nullable: true })
  responseData: any; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 
}
