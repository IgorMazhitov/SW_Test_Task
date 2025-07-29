/**
 * TableCell component with consistent styling
 */
import React from 'react';
import { TableCell as MuiTableCell, TableCellProps as MuiTableCellProps } from '@mui/material';

/**
 * TableCell props
 */
export interface TableCellProps extends MuiTableCellProps {
  /** Cell content */
  children: React.ReactNode;
}

/**
 * TableCell component for consistent table cell styling
 * @param props TableCell properties
 * @returns React component
 */
const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  ...rest 
}) => {
  return (
    <MuiTableCell {...rest}>
      {children}
    </MuiTableCell>
  );
};

export default TableCell;
