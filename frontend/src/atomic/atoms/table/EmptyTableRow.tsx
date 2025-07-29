/**
 * EmptyTableRow component to display when no data is available
 */
import React from 'react';
import { TableRow, TableCell } from '@mui/material';

/**
 * EmptyTableRow props
 */
export interface EmptyTableRowProps {
  /** Number of columns in the table */
  colSpan: number;
  
  /** Message to display */
  message?: string;
}

/**
 * EmptyTableRow component to display when no data is available
 * @param props EmptyTableRow properties
 * @returns React component
 */
const EmptyTableRow: React.FC<EmptyTableRowProps> = ({ 
  colSpan, 
  message = 'No data available' 
}) => {
  return (
    <TableRow>
      <TableCell 
        colSpan={colSpan} 
        align="center" 
        sx={{ py: 4 }}
      >
        {message}
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
