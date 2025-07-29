import { AuditLog } from 'src/entities/auditLog.entity';

/**
 * Interface for audit log query results
 */
export interface IAuditLogResponse {
  /**
   * Total number of audit logs that match the query
   */
  total: number;

  /**
   * The audit logs returned in this response
   */
  logs: AuditLog[];
}
