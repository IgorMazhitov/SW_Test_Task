/**
 * SignupForm component for user registration
 */
import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@mui/material';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';
import SelectInput from '../../atoms/SelectInput';
import { LAYOUT_SPACING } from '../../../constants/app.constants';
import { getValidationError } from '../../../shared/utils/validationUtils';
import { IRole } from '../../../types/role.types';

/**
 * SignupForm props
 */
interface SignupFormProps {
  /**
   * Callback for when signup is submitted
   */
  onSignup: (email: string, password: string, roleId: number, userName: string) => Promise<boolean>;
  
  /**
   * Callback for switching to login form
   */
  onSwitchToLogin?: () => void;
  
  /**
   * Available roles for selection
   */
  roles?: IRole[];
}

/**
 * SignupForm component
 * @param props Component properties
 * @returns React component
 */
const SignupForm: React.FC<SignupFormProps> = ({ 
  onSignup, 
  onSwitchToLogin,
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ]
}) => {
  // Form state
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedRoleId, setSelectedRoleId] = useState<number>(2); // Default to User
  
  // Error state
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  /**
   * Field validation
   */
  const [emailError, setEmailError] = useState<string>('');
  const [userNameError, setUserNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  /**
   * Handle username input change
   */
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    setError(false);
    setUserNameError(getValidationError('userName', newUserName));
  };

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
   * Handle role selection change
   */
  const handleRoleChange = (e: any) => {
    setSelectedRoleId(Number(e.target.value));
  };

  /**
   * Handle signup form submission
   */
  const handleSubmit = async () => {
    // Validate fields
    const userNameValidationError = getValidationError('userName', userName);
    const emailValidationError = getValidationError('email', email);
    const passwordValidationError = getValidationError('password', password);
    
    setUserNameError(userNameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    
    // Check if any validation errors exist
    if (userNameValidationError || emailValidationError || passwordValidationError) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await onSignup(email, password, selectedRoleId, userName);
      if (!success) {
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = roles.map(role => ({
    value: role.id,
    label: role.name
  }));

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
          name="userName"
          label="Username"
          value={userName}
          onChange={handleUserNameChange}
          error={!!userNameError}
          helperText={userNameError}
          required
          disabled={isLoading}
        />
        
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
          helperText={passwordError}
          type="password"
          required
          disabled={isLoading}
        />
        
        <SelectInput
          name="role"
          label="Role"
          value={selectedRoleId}
          options={roleOptions}
          onChange={handleRoleChange}
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
          Sign Up
        </Button>
        
        {onSwitchToLogin && (
          <Button
            variant="outlined"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Switch to Login
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SignupForm;
