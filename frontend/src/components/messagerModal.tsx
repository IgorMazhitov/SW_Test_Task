import React, { useState, useEffect, useContext } from "react";
import { GetMessagesBetweenDto, IMessage, IMessageFromResponse } from "../interfaces/IMessage";
import { IUser } from "../interfaces/IUser";
import MessagesService from "../services/messagesService";
import { Context } from "..";
import { ActionRequest } from "../interfaces/ActionRequest";
import { ActionType } from "../interfaces/IAction";
import ActionsService from "../services/actionsService";
import { typeMapping } from "../common/helpers";

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
    const messages: IMessageFromResponse[] = await MessagesService.fetchMessagesBetween(
      request
    ).then((response) => response.data);
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
        setNewMessage("")
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
        setNewMessage("")
        fetchMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    handleModalClose(false)
  };

  return (
    <>
      <div className="modal" style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white", 
        border: "1px solid black",
        zIndex: "999", 
        padding: "20px",
        borderRadius: "8px",
      }}>
        <div className="modal-content">
          <span
            style={{
              cursor: "pointer",
              float: "right",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={handleClose}
          >
            &times;
          </span>
          <h2>Messages with {user.userName}</h2>
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
                    color: message.sender.id === store.user.id ? "#fff" : "#000",
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
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              cols={50}
              style={{ width: "100%", resize: "none", marginTop: "10px" }}
              placeholder="Enter your message..."
            />
            <button
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMessagesModal;
