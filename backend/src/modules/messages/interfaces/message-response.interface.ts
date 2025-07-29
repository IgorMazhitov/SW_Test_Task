/**
 * Interface for single message response
 */
export interface IMessageResponse {
  id: number;
  content: string;
  sender: {
    id: number;
  };
  receiver: {
    id: number;
  };
  timestamp: Date;
}

/**
 * Interface for multiple messages response
 */
export interface IMessageListResponse {
  messages: IMessageResponse[];
}
