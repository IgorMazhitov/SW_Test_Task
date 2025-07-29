/**
 * ItemCreationForm molecule for creating new items
 */
import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import ActionsService from '../../../services/actionsService';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';

/**
 * ItemCreationForm props
 */
export interface ItemCreationFormProps {
  /** Callback when an item is successfully created */
  onCreation: () => void;
}

/**
 * Form for creating new items
 * @param props Component properties
 * @returns React component
 */
const ItemCreationForm: React.FC<ItemCreationFormProps> = ({ onCreation }) => {
  // Form state
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    description: false
  });

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors = {
      name: !itemName.trim(),
      description: !itemDescription.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  /**
   * Handle item creation
   */
  const handleCreateItem = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await ActionsService.createItem(itemName, itemDescription);
      
      // Reset form
      setItemName('');
      setItemDescription('');
      
      // Notify parent component
      onCreation();
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            name="itemName"
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            error={errors.name}
            helperText={errors.name ? 'Item name is required' : ''}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextInput
            name="itemDescription"
            label="Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description ? 'Description is required' : ''}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            customVariant="primary"
            onClick={handleCreateItem}
            disabled={isLoading}
            loading={isLoading}
            fullWidth
          >
            Create Item
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemCreationForm;
