/**
 * UserEditModal component for editing user details
 */
import React, { useState } from 'react';
import { Grid, CardContent, CardActions } from '@mui/material';
import { IUser, IUserUpdateRequest } from '../../../../types/user.types';
import { IRole } from '../../../../types/role.types';
import TextInput from '../../../atoms/TextInput';
import SelectInput from '../../../atoms/SelectInput';
import Button from '../../../atoms/Button';
import Modal from '../Modal';

/**
 * UserEditModal props
 */
export interface UserEditModalProps {
  /** User data to edit */
  user: IUser;
  
  /** Available roles for selection */
  roles: IRole[];
  
  /** Whether the modal is open */
  open: boolean;
  
  /** Callback when modal is closed */
  onClose: () => void;
  
  /** Callback when user is saved */
  onSave: (user: IUserUpdateRequest) => void;
}

/**
 * Modal component for editing user details
 * @param props UserEditModal properties
 * @returns React component
 */
const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  roles,
  open,
  onClose,
  onSave,
}) => {
  const [userName, setUserName] = useState<string>(user.userName);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');
  const [roleId, setRoleId] = useState<number>(user.role?.id || roles[0]?.id || 1);

  /**
   * Handle saving user changes
   */
  const handleSave = () => {
    const updatedUser: IUserUpdateRequest = {
      id: user.id,
      userName,
      email,
      roleId,
    };
    
    // Add password only if it's provided
    const userWithPassword = password ? { ...updatedUser, password } : updatedUser;
    onSave(userWithPassword);
  };

  /**
   * Map roles to select options
   */
  const roleOptions = roles.map(role => ({
    value: role.id,
    label: role.name,
  }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={400}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              name="userName"
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Leave blank to keep current password"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectInput
              name="role"
              label="Role"
              value={roleId}
              options={roleOptions}
              onChange={(e) => setRoleId(Number(e.target.value))}
              size="small"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button 
          customVariant="secondary" 
          variant="outlined" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          customVariant="primary" 
          onClick={handleSave}
        >
          Save
        </Button>
      </CardActions>
    </Modal>
  );
};

export default UserEditModal;
