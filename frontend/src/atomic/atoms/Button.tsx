/**
 * Button component with variant styling
 */
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { COLORS } from '../../theme/theme';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

/**
 * Button props extending MUI ButtonProps
 */
export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  /**
   * Button text or child elements
   */
  children: React.ReactNode;
  
  /**
   * Custom variant beyond MUI's standard variants
   */
  customVariant?: ButtonVariant;
  
  /**
   * MUI button variant
   */
  variant?: 'text' | 'outlined' | 'contained';
  
  /**
   * Callback function for button click
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Whether the button is in loading state
   */
  loading?: boolean;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Start icon
   */
  startIcon?: React.ReactNode;
  
  /**
   * End icon
   */
  endIcon?: React.ReactNode;
}

/**
 * Map custom variant to MUI color
 */
const variantToColor: Record<ButtonVariant, any> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

/**
 * Button component
 * @param props Button properties
 * @returns React component
 */
const Button: React.FC<ButtonProps> = ({
  children,
  customVariant = 'primary',
  variant = 'contained',
  onClick,
  className,
  loading = false,
  disabled = false,
  size = 'medium',
  startIcon,
  endIcon,
  ...rest
}) => {
  // Determine the color based on the custom variant
  const color = variantToColor[customVariant];

  return (
    <MuiButton
      color={color}
      variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled || loading}
      size={size}
      startIcon={loading ? undefined : startIcon}
      endIcon={endIcon}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
