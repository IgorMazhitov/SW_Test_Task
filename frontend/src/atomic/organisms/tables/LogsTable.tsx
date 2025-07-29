/**
 * LogsTable organism for displaying audit logs
 */
import React from 'react';
import { TableRow } from '@mui/material';
import { formatRequestForLogs, formatResponseForLogs } from '../../../shared/utils/helpers';
import TableCell from '../../atoms/table/TableCell';
import EmptyTableRow from '../../atoms/table/EmptyTableRow';
import { Table } from '../../molecules/table';
import { IAuditLog } from '../../../types/audit.types';

/**
 * LogsTable props
 */
export interface LogsTableProps {
  /** Array of logs to display */
  logs: IAuditLog[];
}

/**
 * Component for displaying audit logs in a table
 * @param props Component properties
 * @returns React component
 */
const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  // Format log data for display
  const formattedLogs = logs.map((log) => ({
    ...log,
    requestData: formatRequestForLogs(JSON.stringify(log.request)),
    responseData: formatResponseForLogs(JSON.stringify(log.response)),
  }));

  // Define table columns
  const columns = ['Email', 'Id', 'Type', 'Created At', 'Request', 'Response'];

  return (
    <Table 
      columns={columns}
      maxHeight="75vh"
      aria-label="audit logs table"
    >
      {formattedLogs.length === 0 ? (
        <EmptyTableRow colSpan={columns.length} message="No logs found" />
      ) : (
        formattedLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.email}</TableCell>
            <TableCell>{log.id}</TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell>{log.timestamp.toLocaleString()}</TableCell>
            <TableCell sx={{ wordBreak: "break-word" }}>{log.requestData}</TableCell>
            <TableCell>{log.responseData}</TableCell>
          </TableRow>
        ))
      )}
    </Table>
  );
};

export default LogsTable;
