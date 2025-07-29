/**
 * RolesCreationForm molecule for creating new roles
 */
import React, { useState } from 'react';
import { Grid, Paper, Chip } from '@mui/material';
import UsersService from '../../../services/usersService';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';

/**
 * Form for creating new roles
 * @returns React component
 */
const RolesCreationForm: React.FC = () => {
  // Form state
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permissionInput, setPermissionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    permissions: false
  });

  /**
   * Add new permission to the list
   */
  const handleAddPermission = () => {
    const trimmedPermission = permissionInput.trim();
    
    if (trimmedPermission && !permissions.includes(trimmedPermission)) {
      setPermissions([...permissions, trimmedPermission]);
      setPermissionInput('');
    }
  };

  /**
   * Remove permission from the list
   */
  const handleRemovePermission = (permission: string) => {
    setPermissions(permissions.filter(p => p !== permission));
  };

  /**
   * Handle keydown event for adding permissions
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPermission();
    }
  };

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors = {
      name: !roleName.trim(),
      description: !roleDescription.trim(),
      permissions: permissions.length === 0
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  /**
   * Handle role creation
   */
  const handleCreateRole = async () => {
    if (!validateForm()) {
      return;
    }

    // setIsLoading(true);
    // try {
    //   await UsersService.createRole({
    //     name: roleName,
    //     description: roleDescription,
    //     permissions
    //   });
      
    //   // Reset form
    //   setRoleName('');
    //   setRoleDescription('');
    //   setPermissions([]);
      
    // } catch (error) {
    //   console.error('Error creating role:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Paper elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            name="roleName"
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            error={errors.name}
            helperText={errors.name ? 'Role name is required' : ''}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextInput
            name="roleDescription"
            label="Description"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description ? 'Description is required' : ''}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextInput
            name="permission"
            label="Add Permission"
            value={permissionInput}
            onChange={(e) => setPermissionInput(e.target.value)}
            onKeyDown={handleKeyDown}
            helperText="Press Enter to add permission"
            fullWidth
            InputProps={{
              endAdornment: (
                <Button 
                  onClick={handleAddPermission}
                  customVariant="secondary"
                  size="small"
                >
                  Add
                </Button>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          {permissions.length > 0 ? (
            <Grid container spacing={1}>
              {permissions.map((permission) => (
                <Grid item key={permission}>
                  <Chip
                    label={permission}
                    onDelete={() => handleRemovePermission(permission)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <TextInput
              name="noPermissions"
              value="No permissions added yet"
              disabled
              label='No permissions added yet'
              onChange={() => {}}
              error={errors.permissions}
              helperText={errors.permissions ? 'At least one permission is required' : ''}
              fullWidth
            />
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Button
            customVariant="primary"
            onClick={handleCreateRole}
            disabled={isLoading}
            loading={isLoading}
            fullWidth
          >
            Create Role
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RolesCreationForm;
