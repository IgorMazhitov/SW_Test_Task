/**
 * LoginForm component for user authentication
 */
import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@mui/material';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';
import { LAYOUT_SPACING } from '../../../constants/app.constants';
import { getValidationError, isValidEmail } from '../../../shared/utils/validationUtils';

/**
 * LoginForm props
 */
interface LoginFormProps {
  /**
   * Callback for when login is submitted
   */
  onLogin: (email: string, password: string) => Promise<boolean>;
  
  /**
   * Callback for switching to signup form
   */
  onSwitchToSignup?: () => void;
}

/**
 * LoginForm component
 * @param props Component properties
 * @returns React component
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  // Form state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // Error state
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  /**
   * Field validation
   */
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  /**
   * Handle email input change
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setError(false);
    setEmailError(getValidationError('email', newEmail));
  };

  /**
   * Handle password input change
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(false);
    setPasswordError(getValidationError('password', newPassword));
  };

  /**
   * Handle login form submission
   */
  const handleSubmit = async () => {
    // Validate fields
    const emailValidationError = getValidationError('email', email);
    const passwordValidationError = getValidationError('password', password);
    
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    
    // Check if any validation errors exist
    if (emailValidationError || passwordValidationError) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: LAYOUT_SPACING.MEDIUM,
        justifyContent: 'center',
        maxWidth: '400px',
        width: '100%',
        alignItems: 'center',
        padding: LAYOUT_SPACING.LARGE,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          gap: LAYOUT_SPACING.SMALL,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <TextInput
          name="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError || error}
          helperText={emailError}
          type="email"
          required
          disabled={isLoading}
        />
        
        <TextInput
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError || error}
          helperText={passwordError || (error ? 'Invalid email or password' : '')}
          type="password"
          required
          disabled={isLoading}
        />
      </CardContent>
      
      <CardActions sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Button
          customVariant="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
        >
          Log In
        </Button>
        
        {onSwitchToSignup && (
          <Button
            variant="outlined"
            onClick={onSwitchToSignup}
            disabled={isLoading}
          >
            Switch to Sign Up
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LoginForm;
