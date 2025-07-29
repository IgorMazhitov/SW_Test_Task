/**
 * Basic table molecule combining table components
 */
import React from 'react';
import { 
  Table as MuiTable, 
  TableProps as MuiTableProps,
  TableContainer,
  TableBody,
  Paper
} from '@mui/material';
import TableHeader from '../../atoms/table/TableHeader';

/**
 * TableProps definition
 */
export interface TableProps extends MuiTableProps {
  /** Column definitions */
  columns: string[];
  
  /** Custom renderer for column headers */
  renderColumnHeader?: (column: string) => React.ReactNode;
  
  /** Table children (typically TableRows) */
  children: React.ReactNode;
  
  /** Maximum height of the table */
  maxHeight?: number | string;
}

/**
 * Basic table molecule combining table components
 * @param props Table properties
 * @returns React component
 */
const Table: React.FC<TableProps> = ({ 
  columns,
  renderColumnHeader,
  children,
  maxHeight = 500,
  ...rest 
}) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight }}>
      <MuiTable stickyHeader aria-label="data table" {...rest}>
        <TableHeader 
          columns={columns} 
          renderColumnHeader={renderColumnHeader} 
        />
        <TableBody>
          {children}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
