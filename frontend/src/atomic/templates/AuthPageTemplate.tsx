/**
 * AuthPageTemplate - Template for authentication pages
 */
import React, { ReactNode } from 'react';
import { Container, Paper } from '@mui/material';

/**
 * AuthPageTemplate props
 */
interface AuthPageTemplateProps {
  /** Child components to render */
  children: ReactNode;
}

/**
 * Authentication page layout template
 * @param props Component properties
 * @returns React component
 */
const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({
  children
}) => {
  return (
    <Container maxWidth="sm" sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AuthPageTemplate;
