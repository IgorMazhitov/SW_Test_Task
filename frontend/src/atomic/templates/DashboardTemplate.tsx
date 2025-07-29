/**
 * DashboardTemplate - Template for dashboard style pages with header and content areas
 */
import React, { ReactNode } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

/**
 * DashboardTemplate props
 */
interface DashboardTemplateProps {
  /** Dashboard title */
  title?: string;
  /** Child components to render in content area */
  children: ReactNode;
}

/**
 * Dashboard layout template with title and content area
 * @param props Component properties
 * @returns React component
 */
const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  title,
  children
}) => {
  return (
    <Container maxWidth="lg">
      {title && (
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Paper>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardTemplate;
