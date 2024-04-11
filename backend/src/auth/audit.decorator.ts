import { SetMetadata } from '@nestjs/common'
const AUDIT_LOG_DATA = 'AUDIT_LOG_DATA'

export const AuditLog = (value: string) => SetMetadata(AUDIT_LOG_DATA, value)