import React, { useState, useEffect, useContext } from "react";
import {
  IMessage,
} from "../../interfaces/IMessage.interface";
import { IUser } from "../../interfaces/IUser.interface";
import MessagesService from "../../services/messagesService";
import { Context } from "../..";
import { ActionRequest } from "../../interfaces/api-interfaces/ActionsApi.interface";
import { ActionType } from "../../interfaces/IAction.interface";
import ActionsService from "../../services/actionsService";
import { typeMapping } from "../../common/helpers";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { GetMessagesBetweenDto, IMessageFromResponse } from "../../interfaces/api-interfaces/MessagesApi.interface";

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
    <Card
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      }}
      component={Paper}
      elevation={5}
    >
      <CardContent
        sx={{
          padding: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            margin: 0,
          }}
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              &times;
            </Button>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Messages with {user.email}</Typography>
          </Grid>
          <Grid item xs={12} minHeight={350} minWidth={400} component={Paper}>
            {messages.map((message, index) => (
              <Grid
                item
                xs={12}
                key={index}
                style={{
                  padding: 10,
                  margin: 5,
                  display: "flex",
                  justifyContent:
                    message.sender.id === store.user.id
                      ? "flex-end"
                      : "flex-start",
                  alignItems: "center",
                }}
              >
                <Chip
                  style={{ maxWidth: "25%" }}
                  label={String(message.content)}
                ></Chip>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          minRows={4}
          multiline
          maxRows={6}
          placeholder="Enter your message..."
          style={{
            width: "80%",
          }}
        />
        <Button size="large" variant="contained" onClick={handleSend}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserMessagesModal;
