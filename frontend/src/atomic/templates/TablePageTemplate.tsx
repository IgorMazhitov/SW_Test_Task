/**
 * TablePageTemplate - Template for pages displaying tables
 */
import React, { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

/**
 * TablePageTemplate props
 */
interface TablePageTemplateProps {
  /** Header content (filters, search, etc.) */
  headerContent?: ReactNode;
  /** Main table content */
  tableContent: ReactNode;
  /** Pagination or additional controls */
  footerContent?: ReactNode;
}

/**
 * Template for pages that primarily display tables
 * @param props Component properties
 * @returns React component
 */
const TablePageTemplate: React.FC<TablePageTemplateProps> = ({
  headerContent,
  tableContent,
  footerContent
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {headerContent && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            {headerContent}
          </Grid>
        </Grid>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {tableContent}
        </Grid>
      </Grid>
      
      {footerContent && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            {footerContent}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TablePageTemplate;
