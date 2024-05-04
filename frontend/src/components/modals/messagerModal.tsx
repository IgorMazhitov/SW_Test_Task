import React, { useState, useEffect, useContext } from "react";
import {
  GetMessagesBetweenDto,
  IMessage,
  IMessageFromResponse,
} from "../../interfaces/IMessage";
import { IUser } from "../../interfaces/IUser";
import MessagesService from "../../services/messagesService";
import { Context } from "../..";
import { ActionRequest } from "../../interfaces/ActionRequest";
import { ActionType } from "../../interfaces/IAction";
import ActionsService from "../../services/actionsService";
import { typeMapping } from "../../common/helpers";
import {
  MessageColor,
  MessagePosition,
  MessagesBox,
  Modal,
  ModalContainer,
} from "../../UI/styled/modals";
import { BluePinkButton, PinkBlueButton } from "../../UI/styled/buttons";
import { ModalMessageInput } from "../../UI/styled/inputs";

type UserMessagesPropsType = {
  user: IUser;
  handleModalClose: (state: boolean) => void;
};

const UserMessagesModal = ({
  user,
  handleModalClose,
}: UserMessagesPropsType) => {
  const { store } = useContext(Context);
  const [messages, setMessages] = useState<IMessageFromResponse[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const request: GetMessagesBetweenDto = {
      senderId: user.id,
      receiverId: store.user.id,
    };
    const messages: IMessageFromResponse[] =
      await MessagesService.fetchMessagesBetween(request);
    setMessages(messages);
  };

  const handleSend = async () => {
    try {
      if (store.user.role.name === "Admin") {
        const message: IMessage = {
          senderId: store.user.id,
          receiverId: user.id,
          content: newMessage,
        };
        await MessagesService.sendMessageFromAdmin(message);
        setNewMessage("");
        fetchMessages();
      } else {
        const request: ActionRequest = {
          userId: store.user.id,
          type: typeMapping[ActionType.TYPE_2],
          description: `Message request from user ${store.user.email} to ${user.email}`,
          userGetId: user.id,
          text: newMessage,
        };
        await ActionsService.requestActionUser(request);
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    handleModalClose(false);
  };

  return (
    <>
      <Modal>
        <div>
          <ModalContainer>
            <BluePinkButton onClick={handleClose}>&times;</BluePinkButton>
            <h2>Messages with {user.userName}</h2>
          </ModalContainer>
          <MessagesBox>
            {messages.map((message, index) => (
              <MessagePosition
                key={index}
                sender={message.sender.id === store.user.id}
              >
                <MessageColor sender={message.sender.id === store.user.id}>
                  {String(message.content)}
                </MessageColor>
              </MessagePosition>
            ))}
          </MessagesBox>
          <div>
            <ModalMessageInput
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={1}
              onFocus={(e) => (e.target.rows += 4)}
              onBlur={(e) => (e.target.rows -= 4)}
              cols={50}
              placeholder="Enter your message..."
            />
            <PinkBlueButton onClick={handleSend}>Send</PinkBlueButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserMessagesModal;
