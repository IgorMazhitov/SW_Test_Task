import { useContext } from "react";
import { Context } from "../..";
import {
  columnsForUserTable,
  filterColumnsForUserTable,
} from "../../common/helpers";
import { IUser } from "../../interfaces/IUser";
import { Table, TableCell, TableHead } from "../../UI/styled/tables";
import { BluePinkButton, PinkBlueButton } from "../../UI/styled/buttons";

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
    <Table>
      {columns.map((column) => (
        <TableHead key={column}>{column}</TableHead>
      ))}
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.role.name}</TableCell>
            <TableCell>{user.userName}</TableCell>
            {user.email && <TableCell>{user.email}</TableCell>}
            {user?.created_at && (
              <TableCell>{user?.created_at.toLocaleString()}</TableCell>
            )}
            {user?.password && <TableCell>{user.password}</TableCell>}
            <TableCell>
              {isUserAdmin && (
                <PinkBlueButton
                  onClick={() => onClickEdit && onClickEdit(user)}
                >
                  Edit
                </PinkBlueButton>
              )}
              <BluePinkButton
                onClick={() => onClickMessage && onClickMessage(user)}
              >
                Message
              </BluePinkButton>
              <PinkBlueButton onClick={() => onClickItem && onClickItem(user)}>
                Item
              </PinkBlueButton>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTableComponent;
