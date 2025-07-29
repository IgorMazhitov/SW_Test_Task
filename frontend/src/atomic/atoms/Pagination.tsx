/**
 * Pagination atom for navigation between pages of data
 */
import React from 'react';
import { Box, Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material';

/**
 * Pagination props
 */
export interface PaginationProps extends Omit<MuiPaginationProps, 'count' | 'page' | 'onChange'> {
  /** Current page number */
  currentPage: number;
  
  /** Total number of pages */
  totalPages: number;
  
  /** Handler for page change */
  onPageChange: (page: number) => void;
}

/**
 * Simple pagination component
 * @param props Component properties
 * @returns React component
 */
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  ...rest
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
      <MuiPagination 
        count={totalPages || 1}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        {...rest}
      />
    </Box>
  );
};

export default Pagination;
