import React, { useEffect, useState } from "react";
import UsersService from "../services/usersService";
import { IRole, UserCreationDto } from "../interfaces/IUser";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

type UserCreationFormProps = {
  handleSubmitUserCreation: (formData: UserCreationDto) => void;
};

function UserCreationForm({ handleSubmitUserCreation }: UserCreationFormProps) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);
  const [roles, setRoles] = useState<IRole[]>([]);

  const fetchRoles = async () => {
    try {
      const roles = await UsersService.fetchRoles();
      setRoles(roles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      if (!userName.trim() || !email.trim() || !password.trim() || !role) {
        console.log("All fields should not be empty");
        return;
      }
      const request: UserCreationDto = {
        userName,
        email,
        password,
        roleId: role,
      };
      handleSubmitUserCreation(request);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      gap={2}
      sx={{
        padding: "10px",
      }}
      component={Paper}
      elevation={5}
    >
      <Grid
        item
        xs={2}
      >
        <TextField
          required
          id="userName"
          label="Username"
          value={userName}
          size="small"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          required
          id="email"
          label="Email"
          value={email}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          required
          id="password"
          type="password"
          label="Password"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Select
          id="role"
          size="small"
          value={role}
          onChange={(e) => setRole(Number(e.target.value))}
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create User
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserCreationForm;
