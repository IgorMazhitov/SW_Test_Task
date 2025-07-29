/**
 * LogoutButton component for user logout
 */
import React from 'react';
import Button from '../../atoms/Button';
import { useAuth } from '../../../hooks/useAuth';

/**
 * LogoutButton props
 */
interface LogoutButtonProps {
  /**
   * Custom variant for styling
   */
  customVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  
  /**
   * MUI button variant
   */
  variant?: 'text' | 'outlined' | 'contained';
  
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LogoutButton component for user logout
 * @param props Component properties
 * @returns React component
 */
const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  customVariant = 'secondary',
  variant = 'outlined',
  size = 'medium',
  className 
}) => {
  const { logout } = useAuth();
  
  /**
   * Handle logout button click
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      customVariant={customVariant}
      variant={variant}
      onClick={handleLogout}
      size={size}
      className={className}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
