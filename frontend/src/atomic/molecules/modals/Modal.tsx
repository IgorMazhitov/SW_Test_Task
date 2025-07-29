/**
 * Modal component for displaying dialogs
 */
import React from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps, Backdrop } from '@mui/material';
import ModalContainer from '../../atoms/ModalContainer';

/**
 * Modal props
 */
export interface ModalProps extends Omit<MuiModalProps, 'children'> {
  /** Modal title */
  title?: string;
  
  /** Modal content */
  children: React.ReactNode;
  
  /** Whether the modal is open */
  open: boolean;
  
  /** Callback when the modal is closed */
  onClose: () => void;
  
  /** Modal width */
  width?: string | number;
  
  /** Maximum modal width */
  maxWidth?: string | number;
}

/**
 * Modal component for displaying dialogs
 * @param props Modal properties
 * @returns React component
 */
const Modal: React.FC<ModalProps> = ({ 
  children, 
  open, 
  onClose,
  width,
  maxWidth,
  ...rest 
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...rest}
    >
      <ModalContainer width={width} maxWidth={maxWidth}>
        {children}
      </ModalContainer>
    </MuiModal>
  );
};

export default Modal;
