/**
 * ActionsTable organism for displaying action data
 */
import React from 'react';
import { TableRow } from '@mui/material';
import TableCell from '../../atoms/table/TableCell';
import EmptyTableRow from '../../atoms/table/EmptyTableRow';
import { Table } from '../../molecules/table';
import Button from '../../atoms/Button';
import { IAction } from '../../../types/action.types';

/**
 * ActionsTable props
 */
export interface ActionsTableProps {
  /** Array of actions to display */
  actions: IAction[];
  
  /** Columns to display */
  columns: string[];
  
  /** Handler for approve action button */
  handleApproveAction?: (id: number) => void;
  
  /** Handler for decline action button */
  handleDeclineAction?: (id: number) => void;
}

/**
 * Component for displaying actions in a table
 * @param props Component properties
 * @returns React component
 */
const ActionsTable: React.FC<ActionsTableProps> = ({ 
  actions, 
  columns,
  handleApproveAction,
  handleDeclineAction
}) => {
  return (
    <Table 
      columns={columns}
      maxHeight="75vh"
      aria-label="actions table"
    >
      {actions.length === 0 ? (
        <EmptyTableRow colSpan={columns.length} message="No actions found" />
      ) : (
        actions.map((action) => (
          <TableRow key={action.id}>
            {columns.map((column: string) => {
              if (column === "approve") {
                return (
                  <TableCell key={`${action.id}-${column}`}>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleApproveAction && handleApproveAction(action.id)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                );
              } else if (column === "decline") {
                return (
                  <TableCell key={`${action.id}-${column}`}>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleDeclineAction && handleDeclineAction(action.id)}
                    >
                      Decline
                    </Button>
                  </TableCell>
                );
              } else if (column === "approved") {
                return (
                  <TableCell key={`${action.id}-${column}`}>
                    {action.approved ? "Approved" : "Not Approved"}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={`${action.id}-${column}`}>
                    {(action as any)[column] !== undefined ? (action as any)[column] : " - "}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        ))
      )}
    </Table>
  );
};

export default ActionsTable;
