/**
 * UserCreationForm molecule for creating new users
 */
import React, { useEffect, useState } from 'react';
import { Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IRole } from '../../../types/role.types';
import UsersService from '../../../services/usersService';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';
import { UserCreationDto } from '../../../types/api/users-api.types';

/**
 * UserCreationForm props
 */
export interface UserCreationFormProps {
  /** Handler for form submission */
  onSubmit: (formData: UserCreationDto) => void;
}

/**
 * Form for creating new users
 * @param props Component properties
 * @returns React component
 */
const UserCreationForm: React.FC<UserCreationFormProps> = ({ 
  onSubmit 
}) => {
  // Form state
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<number>(1);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
    role: false,
  });
  
  /**
   * Fetch available roles
   */
  const fetchRoles = async () => {
    try {
      const roles = await UsersService.fetchRoles();
      setRoles(roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  
  // Load roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);
  
  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors = {
      userName: !userName.trim(),
      email: !email.trim(),
      password: !password.trim(),
      role: !role,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const request: UserCreationDto = {
        userName,
        email,
        password,
        roleId: role,
      };
      
      onSubmit(request);
      
      // Reset form
      setUserName('');
      setEmail('');
      setPassword('');
      setRole(1);
    } catch (error) {
      console.error('Error submitting user creation form:', error);
    }
  };
  
  return (
    <Paper 
      elevation={5} 
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: 2 }}
    >
      <Grid 
        container 
        spacing={2}
    >
      <Grid item xs={12}>
        <TextInput
          name="userName"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={errors.userName}
          helperText={errors.userName ? 'Username is required' : ''}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextInput
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth error={errors.role}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={(e) => setRole(Number(e.target.value))}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <Button
          type="submit"
          customVariant="primary"
          fullWidth
        >
          Create User
        </Button>
        </Grid>
    </Paper>
  );
};

export default UserCreationForm;
