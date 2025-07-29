/**
 * DefaultPageTemplate - Basic page template with standard layout
 */
import React, { ReactNode } from 'react';
import { Container, Box } from '@mui/material';

/**
 * DefaultPageTemplate props
 */
interface DefaultPageTemplateProps {
  /** Page title */
  title?: string;
  /** Child components to render */
  children: ReactNode;
}

/**
 * Default page layout template
 * @param props Component properties
 * @returns React component
 */
const DefaultPageTemplate: React.FC<DefaultPageTemplateProps> = ({
  title,
  children
}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {children}
      </Box>
    </Container>
  );
};

export default DefaultPageTemplate;
