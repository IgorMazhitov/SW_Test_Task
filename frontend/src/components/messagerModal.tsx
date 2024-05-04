import React, { useState, useEffect, useContext } from "react";
import {
  GetMessagesBetweenDto,
  IMessage,
  IMessageFromResponse,
} from "../interfaces/IMessage";
import { IUser } from "../interfaces/IUser";
import MessagesService from "../services/messagesService";
import { Context } from "..";
import { ActionRequest } from "../interfaces/ActionRequest";
import { ActionType } from "../interfaces/IAction";
import ActionsService from "../services/actionsService";
import { typeMapping } from "../common/helpers";
import { Modal, ModalContainer } from "../UI/styled/modals";
import { BluePinkButton, PinkBlueButton } from "../UI/styled/buttons";
import { ModalMessageInput } from "../UI/styled/inputs";

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
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign:
                    message.sender.id === store.user.id ? "right" : "left",
                }}
              >
                <p
                  style={{
                    backgroundColor:
                      message.sender.id === store.user.id
                        ? "#007bff"
                        : "#f0f0f0",
                    color:
                      message.sender.id === store.user.id ? "#fff" : "#000",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  {String(message.content)}
                </p>
              </div>
            ))}
          </div>
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
