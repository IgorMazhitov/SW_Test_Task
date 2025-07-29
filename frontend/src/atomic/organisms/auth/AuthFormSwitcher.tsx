/**
 * AuthFormSwitcher organism for switching between login and signup forms
 */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../hooks/useAuth';
import { LoginForm, SignupForm } from '../../molecules/auth';
import { IRole } from '../../../types/role.types';

/**
 * AuthFormSwitcher props
 */
interface AuthFormSwitcherProps {
  /**
   * Whether to initially show signup form
   */
  initialShowSignup?: boolean;
  
  /**
   * Available roles for selection
   */
  roles?: IRole[];
}

/**
 * AuthFormSwitcher organism for switching between login and signup forms
 * @param props Component properties
 * @returns React component
 */
const AuthFormSwitcher: React.FC<AuthFormSwitcherProps> = ({ 
  initialShowSignup = false,
  roles
}) => {
  // State for toggling between login and signup forms
  const [isSignup, setIsSignup] = useState<boolean>(initialShowSignup);
  
  // Authentication hooks
  const { login, register } = useAuth();

  /**
   * Toggle between login and signup forms
   */
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  /**
   * Handle login submission
   * @param email User email
   * @param password User password
   * @returns Promise resolving to success status
   */
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      return await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  /**
   * Handle signup submission
   * @param email User email
   * @param password User password
   * @param roleId User role ID
   * @param userName User name
   * @returns Promise resolving to success status
   */
  const handleSignup = async (
    email: string, 
    password: string, 
    roleId: number, 
    userName: string
  ): Promise<boolean> => {
    try {
      return await register(email, password, userName, roleId);
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  return (
    <>
      {isSignup ? (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={toggleForm}
          roles={roles}
        />
      ) : (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={toggleForm}
        />
      )}
    </>
  );
};

export default observer(AuthFormSwitcher);
