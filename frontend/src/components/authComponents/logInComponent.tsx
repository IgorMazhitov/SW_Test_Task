import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";

interface LoginProps {
  callback?: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({ callback }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { store } = useContext(Context);

  const handleLogin = async () => {
    try {
      const error = await store.login(email, password);
      if (error) {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        maxWidth: "max-content",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          value={email}
          variant="standard"
          type="email"
          error={error}
          label="Email"
        />
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          value={password}
          variant="standard"
          error={error}
          type="password"
          label="Password"
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => handleLogin()}>
          Log In
        </Button>
        <Button variant="outlined" onClick={callback}>
          "Switch to SignUp"
        </Button>
      </CardActions>
    </Card>
  );
};

export default observer(LoginComponent);
