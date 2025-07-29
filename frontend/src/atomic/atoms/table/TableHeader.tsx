/**
 * TableHeader component for consistent table header styling
 */
import React from 'react';
import { TableHead, TableRow, TableCell, TableHeadProps } from '@mui/material';
import { COLORS } from '../../../theme/theme';

/**
 * TableHeader props
 */
export interface TableHeaderProps extends TableHeadProps {
  /** Column definitions */
  columns: string[];
  
  /** Custom renderer for column headers */
  renderColumnHeader?: (column: string) => React.ReactNode;
}

/**
 * TableHeader component for consistent table header styling
 * @param props TableHeader properties
 * @returns React component
 */
const TableHeader: React.FC<TableHeaderProps> = ({ 
  columns,
  renderColumnHeader,
  ...rest 
}) => {
  return (
    <TableHead {...rest}>
      <TableRow
        sx={{
          backgroundColor: COLORS.PRIMARY.MAIN,
        }}
      >
        {columns.map((column) => (
          <TableCell 
            key={column}
            sx={{ 
              color: COLORS.PRIMARY.CONTRAST_TEXT,
              backgroundColor: COLORS.PRIMARY.MAIN,
              fontWeight: 'bold'
            }}
          >
            {renderColumnHeader ? renderColumnHeader(column) : column}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
