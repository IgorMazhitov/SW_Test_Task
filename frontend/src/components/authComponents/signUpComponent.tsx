import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../..";
import { IRole } from "../../interfaces/IUser";
import { observer } from "mobx-react-lite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface SignupProps {
  callback?: () => void;
}

const SignupComponent: React.FC<SignupProps> = ({ callback }) => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const roles: IRole[] = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];
  const [selectedRole, setSelectedRole] = useState(2);

  const { store } = useContext(Context);

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
        sx={{
          display: "flex",
          gap: "15px",
          flexDirection: "column",
        }}
      >
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
          placeholder="Username"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <FormControl>
          <InputLabel id="role">Role</InputLabel>
          <Select
            id="role"
            value={selectedRole}
            label="Age"
            onChange={(e) => setSelectedRole(Number(e.target.value))}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => store.signup(email, password, selectedRole, userName)}
        >
          SignUp
        </Button>
        <Button variant="outlined" onClick={callback}>
          "Switch to LogIn"
        </Button>
      </CardActions>
    </Card>
  );
};

export default observer(SignupComponent);
