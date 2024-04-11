import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import UsersService from "../services/usersService";
import { IUser } from "../interfaces/IUser";
import { IItem } from "../interfaces/IItem";
import ActionsService from "../services/actionsService";
import { ActionRequest } from "../interfaces/ActionRequest";
import { ActionType } from "../interfaces/IAction";

const UsersTable = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(store.user.role.name, "store user");
        const users = await UsersService.fetchUsers(store.user.role.name);
        const items = await ActionsService.getItems();
        console.log(users, items);
        setUsers(users.data);
        setItems(items.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleItemSelect = (item: IItem) => {
    setSelectedItem(item);
  };

  // Function to handle giving selected item to user
  const giveItemToUser = async (userToGiveId: number) => {
    console.log(userToGiveId, "check");
    if (selectedItem) {
      try {
        if (store.user.role.name === "Admin") {
          await ActionsService.giveItemAdmin(selectedItem.id, userToGiveId);
        } else {
          const request: ActionRequest = {
            userId: store.user.id,
            type: ActionType.TYPE_1,
            userGetId: userToGiveId,
            itemId: selectedItem.id,
            description: `Giving item with id = ${selectedItem.id} from User with id = ${store.user.id} to User with id = ${userToGiveId}`,
          };
          console.log(request, 'request action')
          await ActionsService.requestActionUser(request);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (users.length) {
    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {users.some((el) => el.id) && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            )}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Username
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            {users.some((el) => el.created_at) && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Created At
              </th>
            )}
            {users.some((el) => el.role) && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {user.id && (
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.id}
                </td>
              )}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.userName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email}
              </td>
              {user.created_at && (
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.created_at.toString()}
                </td>
              )}
              {user.role && (
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.role.name}
                </td>
              )}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <select
                  className="form-select"
                  aria-label="Select Item"
                  onChange={(e) =>
                    handleItemSelect(items[parseInt(e.target.value, 10)])
                  }
                >
                  <option value="">Select Item</option>
                  {items.map((item, index) => (
                    <option value={index} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary"
                  onClick={() => giveItemToUser(user.id)}
                >
                  Give
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <div>No users found</div>;
  }
};

export default UsersTable;
