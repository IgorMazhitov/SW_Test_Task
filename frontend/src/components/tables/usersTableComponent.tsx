import { useContext } from "react";
import { Context } from "../..";
import { filterColumnsForUserTable } from "../../common/helpers";
import { IUser } from "../../interfaces/IUser.interface";
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface UserTableComponentProps {
  users: IUser[];
  onClickEdit?: (user: IUser) => void;
  onClickMessage?: (user: IUser) => void;
  onClickItem?: (user: IUser) => void;
}

const UsersTableComponent: React.FC<UserTableComponentProps> = ({
  users,
  onClickEdit,
  onClickItem,
  onClickMessage,
}) => {
  const { store } = useContext(Context);
  const isUserAdmin = store.user.role.name === "Admin";
  const columns = filterColumnsForUserTable(isUserAdmin);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", margin: 0 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "black",
            }}
          >
            {columns.map((column) => {
              switch (column) {
                case "id":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      ID
                    </TableCell>
                  );
                case "role":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Role
                    </TableCell>
                  );
                case "userName":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Username
                    </TableCell>
                  );
                case "email":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Email
                    </TableCell>
                  );
                case "created_at":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Created At
                    </TableCell>
                  );
                case "password":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Password
                    </TableCell>
                  );
                case "Actions":
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      Actions
                    </TableCell>
                  );
                default:
                  return (
                    <TableCell sx={{ color: "white" }} key={column}>
                      No Data
                    </TableCell>
                  );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.role.name}</TableCell>
              <TableCell>{user.userName}</TableCell>
              {user.email && <TableCell>{user.email}</TableCell>}
              {user?.created_at && (
                <TableCell>{user?.created_at.toLocaleString()}</TableCell>
              )}
              {user?.password && (
                <TableCell>
                  {user.password
                    .split("")
                    .map((el) => "*")
                    .join("")}
                </TableCell>
              )}
              <TableCell>
                <ButtonGroup orientation="vertical">
                  {isUserAdmin && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => onClickEdit && onClickEdit(user)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onClickMessage && onClickMessage(user)}
                  >
                    Message
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onClickItem && onClickItem(user)}
                  >
                    Item
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTableComponent;
