/**
 * Modal wrapper component for consistent modal styling
 */
import React from 'react';
import { Card, CardProps } from '@mui/material';
import { LAYOUT_SPACING } from '../../constants/app.constants';

/**
 * ModalContainer props
 */
export interface ModalContainerProps extends CardProps {
  /** Modal content */
  children: React.ReactNode;
  
  /** Width of the modal */
  width?: string | number;
  
  /** Maximum width of the modal */
  maxWidth?: string | number;
}

/**
 * Modal container component that provides consistent styling for modals
 * @param props ModalContainer properties
 * @returns React component
 */
const ModalContainer: React.FC<ModalContainerProps> = ({ 
  children, 
  width = 500, 
  maxWidth = '95%',
  ...rest 
}) => {
  return (
    <Card
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width,
        maxWidth,
        maxHeight: '90vh',
        overflow: 'auto',
        p: LAYOUT_SPACING.LARGE,
        borderRadius: 2,
        boxShadow: 24,
        ...rest.sx
      }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default ModalContainer;
