/**
 * GiveItemModal component for giving items to users
 */
import React, { useState, useEffect, useContext } from 'react';
import { 
  CardContent, 
  CardActions, 
  Typography,
  Grid
} from '@mui/material';
import { Context } from '../../../../index';
import ActionsService from '../../../../services/actionsService';
import { IItem } from '../../../../types/item.types';
import { IUser } from '../../../../types/user.types';
import Modal from '../Modal';
import Button from '../../../atoms/Button';
import SelectInput from '../../../atoms/SelectInput';
import { ActionType } from '../../../../types/action.types';

/**
 * GiveItemModal props
 */
interface GiveItemModalProps {
  /** User receiving the item */
  userReceiving: IUser;
  
  /** Whether the modal is open */
  open: boolean;
  
  /** Callback when modal is closed */
  onClose: () => void;
}

/**
 * Modal for giving items to users
 * @param props GiveItemModal properties
 * @returns React component
 */
const GiveItemModal: React.FC<GiveItemModalProps> = ({
  userReceiving,
  open,
  onClose
}) => {
  const { store } = useContext(Context);
  const isUserAdmin = store.user.role.name === 'Admin';
  // Use a combined type that includes both old and new item interfaces
  const [items, setItems] = useState<Partial<IItem>[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Fetch items available to give
   */
  const fetchItems = async () => {
    try {
      const userItems = await ActionsService.getItems(store.user.id);
      // Transform items to ensure compatibility with both interfaces
      const enhancedItems = userItems.map(item => ({
        ...item,
        // Add createdAt if it doesn't exist (required by IItem)
        createdAt: new Date(),
      }));
      setItems(enhancedItems);
      if (enhancedItems.length > 0) {
        setSelectedItemId(enhancedItems[0].id);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  useEffect(() => {
    if (open) {
      fetchItems();
    }
  }, [open]);
  
  /**
   * Handle giving the selected item to the user
   */
  const handleGiveItem = async () => {
    if (!selectedItemId) return;
    
    setIsLoading(true);
    try {
      if (isUserAdmin) {
        // Admin can give items directly
        const request = {
          itemId: selectedItemId,
          userId: userReceiving.id,
          adminId: store.user.id,
        };
        await ActionsService.giveItemAdmin(request);
      } else {
        // Regular users create action requests
        const selectedItem = items.find(item => item.id === selectedItemId);
        const request = {
          userId: store.user.id,
          type: ActionType.TYPE_1, // Using enum for proper type safety
          userGetId: userReceiving.id,
          itemId: selectedItemId,
          description: `Giving item ${selectedItem ? selectedItem.name : `with id ${selectedItemId}`} from User ${store.user.id} to User ${userReceiving.id}`,
        };
        await ActionsService.requestActionUser(request);
      }
      onClose();
    } catch (error) {
      console.error('Error giving item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Convert items to select options
   */
  const itemOptions = items.map(item => ({
    value: item.id,
    label: `${item.name} - ${item.description || 'No description'}`
  }));
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      width={400}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Give Item to {userReceiving.userName}
        </Typography>
        
        {items.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" sx={{ py: 3 }}>
            <Typography>
              You don't have any items to give
            </Typography>
          </Grid>
        ) : (
          <SelectInput
            name="itemSelect"
            label="Select Item"
            value={selectedItemId}
            options={itemOptions}
            onChange={(e) => setSelectedItemId(Number(e.target.value))}
            disabled={isLoading || items.length === 0}
          />
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          onClick={onClose} 
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          customVariant="primary"
          onClick={handleGiveItem}
          disabled={!selectedItemId || isLoading || items.length === 0}
          loading={isLoading}
        >
          {isUserAdmin ? 'Give Item' : 'Request Item Transfer'}
        </Button>
      </CardActions>
    </Modal>
  );
};

export default GiveItemModal;
