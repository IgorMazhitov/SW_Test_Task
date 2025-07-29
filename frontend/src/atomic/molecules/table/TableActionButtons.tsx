/**
 * Table action buttons molecule for common table actions
 */
import React from 'react';
import { ButtonGroup, Stack, StackProps } from '@mui/material';
import Button from '../../atoms/Button';

/**
 * Table action buttons props
 */
export interface TableActionButtonsProps extends StackProps {
  /** Flag indicating if user has admin privileges */
  isAdmin?: boolean;
  
  /** Callback function for edit action */
  onEdit?: () => void;
  
  /** Callback function for message action */
  onMessage?: () => void;
  
  /** Callback function for item action */
  onItem?: () => void;
  
  /** Direction of button group */
  direction?: 'row' | 'column';
}

/**
 * Table action buttons component for common table actions
 * @param props TableActionButtons properties
 * @returns React component
 */
const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  isAdmin = false,
  onEdit,
  onMessage,
  onItem,
  direction = 'column',
  ...rest
}) => {
  return (
    <Stack 
      direction={direction} 
      spacing={1} 
      {...rest}
    >
      {isAdmin && onEdit && (
        <Button
          variant="outlined"
          customVariant="primary"
          size="small"
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
      
      {onMessage && (
        <Button
          variant="contained"
          customVariant="primary"
          size="small"
          onClick={onMessage}
        >
          Message
        </Button>
      )}
      
      {onItem && (
        <Button
          variant="outlined"
          customVariant="primary"
          size="small"
          onClick={onItem}
        >
          Item
        </Button>
      )}
    </Stack>
  );
};

export default TableActionButtons;
