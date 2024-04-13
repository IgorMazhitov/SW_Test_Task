export interface IMessage {
  senderId: number;
  receiverId: number;
  content: string;
}

export interface IMessageFromResponse {
    content: string;
    sender: {
        id: number
    };
    receiver: {
        id: number
    }
}

export interface GetMessagesBetweenDto {
    senderId: number;
    receiverId: number;
}

  