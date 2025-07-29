/**
 * UserMessagesModal component for displaying and sending messages between users
 */
import React, { useState, useEffect, useContext } from 'react';
import { 
  Card, 
  CardActions, 
  CardContent, 
  Chip, 
  Grid,
  Typography 
} from '@mui/material';
import { Context } from '../../../../index';
import MessagesService from '../../../../services/messagesService';
import ActionsService from '../../../../services/actionsService';
import TextInput from '../../../atoms/TextInput';
import Button from '../../../atoms/Button';
import Modal from '../Modal';
import { LAYOUT_SPACING } from '../../../../constants/app.constants';
import { IUser } from '../../../../types/user.types';
import { IMessage } from '../../../../types/message.types';
import { GetMessagesBetweenDto, IMessageFromResponse } from '../../../../types/api-interfaces/MessagesApi.interface';
import { ActionType } from '../../../../types/action.types';
// Import old interfaces for compatibility

/**
 * Enhanced message response interface that combines old and new response structures
 */
interface IEnhancedMessageResponse extends IMessageFromResponse {
  id: number;
  sentAt?: string;
  senderName?: string;
  receiverName?: string;
  // Helper properties for compatibility
  senderId?: number;
  receiverId?: number;
}

/**
 * UserMessagesModal props
 */
interface UserMessagesModalProps {
  /** User to exchange messages with */
  user: IUser;
  
  /** Whether the modal is open */
  open: boolean;
  
  /** Callback when modal is closed */
  onClose: () => void;
}

/**
 * Modal for displaying messages between users and sending new ones
 * @param props UserMessagesModal properties
 * @returns React component
 */
const UserMessagesModal: React.FC<UserMessagesModalProps> = ({
  user,
  open,
  onClose
}) => {
  const { store } = useContext(Context);
  const [messages, setMessages] = useState<IEnhancedMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Fetch messages between users
   */
  const fetchMessages = async () => {
    try {
      const request: GetMessagesBetweenDto = {
        senderId: user.id,
        receiverId: store.user.id,
      };
      const fetchedMessages = await MessagesService.fetchMessagesBetween(request);
      // Transform fetched messages to enhanced format for compatibility
      const enhancedMessages: IEnhancedMessageResponse[] = fetchedMessages.map((msg, index) => ({
        ...msg,
        id: index, // Generate temporary IDs if none exist
        senderId: msg.sender?.id,
        receiverId: msg.receiver?.id,
        sentAt: new Date().toISOString(), // Placeholder timestamp
        senderName: msg.sender?.id === user.id ? user.userName : store.user.userName,
      }));
      setMessages(enhancedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  // Load messages on component mount
  useEffect(() => {
    if (open) {
      fetchMessages();
    }
  }, [open, user.id]);
  
  /**
   * Handle sending a new message
   */
  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    setIsLoading(true);
    try {
      if (store.user.role.name === 'Admin') {
        // Admin can send messages directly
        const message: Partial<IMessage> = {
          senderId: store.user.id,
          receiverId: user.id,
          text: newMessage,
        };
        await MessagesService.sendMessageFromAdmin(message);
      } else {
        // Regular users create action requests
        const request = {
          userId: store.user.id,
          type: ActionType.TYPE_2,
          description: `Message request from user ${store.user.email} to ${user.email}`,
          userGetId: user.id,
          text: newMessage,
        };
        await ActionsService.requestActionUser(request);
      }
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Format date for display
   */
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  /**
   * Determine if a message was sent by the current user
   */
  const isCurrentUserSender = (senderId: number | undefined) => {
    if (senderId === undefined) return false;
    return senderId === store.user.id;
  };
  
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      width={500}
      maxWidth="95%"
    >
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" gutterBottom>
          Messages with {user.userName}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2, maxHeight: '300px', overflowY: 'auto', p: 1 }}>
          {messages.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                No messages yet
              </Typography>
            </Grid>
          ) : (
            messages.map((message) => (
              <Grid 
                item 
                xs={12} 
                key={message.id}
                sx={{ 
                  display: 'flex', 
                  justifyContent: isCurrentUserSender(message.senderId) ? 'flex-end' : 'flex-start' 
                }}
              >
                <Chip
                  label={
                    <>
                      <Typography variant="caption" display="block">
                        {isCurrentUserSender(message.senderId) ? 'You' : message.senderName}
                      </Typography>
                      <Typography variant="body2">
                        {message.content || 'No content available'}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {formatDate(message.sentAt)}
                      </Typography>
                    </>
                  }
                  sx={{
                    maxWidth: '80%',
                    height: 'auto',
                    padding: LAYOUT_SPACING.SMALL,
                    backgroundColor: isCurrentUserSender(message.senderId) ? 'primary.light' : 'grey.200',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      display: 'block',
                    }
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
        
        <TextInput
          name="message"
          label="New Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isLoading}
          multiline
          rows={3}
          placeholder="Type your message..."
        />
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', pt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose} 
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          customVariant="primary"
          onClick={handleSend}
          disabled={!newMessage.trim() || isLoading}
          loading={isLoading}
        >
          Send
        </Button>
      </CardActions>
    </Modal>
  );
};

export default UserMessagesModal;
