import { useState } from "react";
import { IUser } from "../../interfaces/IUser.interface";
import {
    Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { IRole } from "../../interfaces/IRole.interface";
import { ChangeUserDto } from "../../interfaces/api-interfaces/UsersApi.interface";

interface UserEditModalProps {
  user: IUser;
  roles: IRole[];
  onClose: () => void;
  onSave: (user: ChangeUserDto) => void;
}
const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  onClose,
  roles,
  onSave,
}) => {
  const [userName, setUserName] = useState<string>(user.userName);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<number>(1);
  const handleSave = () => {
    const newUser: ChangeUserDto = {
      ...user,
      userName,
      email,
      password,
      roleId: roles.find((r) => r.id === role)!.id,
    };
    onSave(newUser);
  };
  return (
    <Card
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        padding: "10px",
      }}
      component={Paper}
      elevation={5}
    >
      <CardContent sx={{
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="userName"
              label="Username"
              value={userName}
              size="small"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>Role:</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(Number(e.target.value))}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </CardContent>
      <CardActions 
        sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
        }}
      >
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => handleSave()}>Save</Button>
      </CardActions>
    </Card>
  );
};

export default UserEditModal;
