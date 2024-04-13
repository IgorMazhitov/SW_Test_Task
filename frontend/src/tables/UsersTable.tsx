import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import UsersService from "../services/usersService";
import {
  ChangeUserDto,
  GetUsersDto,
  IRole,
  IUser,
  UserCreationDto,
} from "../interfaces/IUser";
import { IItem } from "../interfaces/IItem";
import ActionsService from "../services/actionsService";
import { ActionRequest } from "../interfaces/ActionRequest";
import { ActionType } from "../interfaces/IAction";
import UserCreationForm from "../components/userCreationForm";
import RolesCreationForm from "../components/rolesCreationForm";
import Modal from "../common/modal";
import UserMessagesModal from "../components/messagerModal";

const UsersTable = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [editedUserName, setEditedUserName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedRoleId, setEditedRoleId] = useState<number>(store.user.role.id);
  const [editedPassword, setEditedPassword] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showMessagesModal, setShowMessagesModal] = useState<boolean>(false);
  const [messageUser, setMessageUser] = useState<IUser>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [role, setRole] = useState<number>(2);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState<number>(10);

  const handleOpenMessagesModal = (user: IUser) => {
    setMessageUser(user);
    setShowMessagesModal(true);
  };

  const handleCloseMessagesModal = () => {
    setShowMessagesModal(false);
    setMessageUser(undefined);
  };

  const fetchRoles = async () => {
    try {
      const roles = await UsersService.fetchRoles();
      setRoles(roles.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const request: GetUsersDto = {
        page,
        limit,
        roleId: role,
      };
      const users = await UsersService.fetchUsers(request);
      const items = await ActionsService.getItems();
      setUsers(users.data);
      setItems(items.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [page, limit, role, selectedRowsPerPage]);

  const handleItemSelect = (item: IItem) => {
    setSelectedItem(item);
  };

  const giveItemToUser = async (userToGiveId: number) => {
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
          await ActionsService.requestActionUser(request);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitUserCreation = async (formData: UserCreationDto) => {
    try {
      await UsersService.createUser(formData);
      await fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = (user: IUser) => {
    setEditingUser(user);
    setEditedUserName(user.userName);
    setEditedEmail(user.email);
    setEditedPassword(""); // Clear the password field
    setShowEditModal(true);
    setEditedRoleId(user.role.id);
  };

  const handleSaveEdit = async () => {
    if (editingUser) {
      try {
        const editedUser: ChangeUserDto = {
          id: editingUser.id,
          userName: editedUserName,
          email: editedEmail,
          password: editedPassword,
          roleId: editedRoleId,
        };
        await UsersService.updateUser(editedUser);
        await fetchUsers();
        setShowEditModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Close the edit modal without saving any changes
  };

  return (
    <>
      {store.user.role.name === "Admin" && (
        <UserCreationForm handleSubmitUserCreation={handleSubmitUserCreation} />
      )}
      {store.user.role.name === "Admin" && <RolesCreationForm />}
      {users.length !== 0 && (
        <>
          <div style={{ marginBottom: "10px", textAlign: "right" }}>
            Rows per page:
            <select
              value={selectedRowsPerPage}
              onChange={(e) => setSelectedRowsPerPage(Number(e.target.value))}
              style={{ marginLeft: "5px" }}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {users.some((el) => el.id) && (
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    ID
                  </th>
                )}
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Username
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Email
                </th>
                {users.some((el) => el.created_at) && (
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Created At
                  </th>
                )}
                {users.some((el) => el.role) && (
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label htmlFor="roleFilter">Filter by Role:</label>
                    <select
                      id="roleFilter"
                      value={role}
                      onChange={(e) => setRole(Number(e.target.value))}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </th>
                )}
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
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
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditButtonClick(user)}
                    >
                      Edit
                    </button>
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
                      className="btn btn-sm btn-primary"
                      onClick={() => giveItemToUser(user.id)}
                    >
                      Give
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleOpenMessagesModal(user)}
                    >
                      Messages
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((prevPage) => prevPage - 1)}
              style={{ marginRight: "10px" }}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              disabled={users.length < selectedRowsPerPage}
              onClick={() => setPage((prevPage) => prevPage + 1)}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
      {users.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label htmlFor="roleFilter">Filter by Role:</label>
          <select
            id="roleFilter"
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <p
            style={{
              color: "red",
            }}
          >
            No users found except You
          </p>
        </div>
      )}
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
            placeholder="Username"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            type="password"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
            placeholder="Password"
            className="form-control mb-2"
          />
          <select
            id="editedRoleSelector"
            value={editedRoleId}
            onChange={(e) => setEditedRoleId(Number(e.target.value))}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {showMessagesModal && <UserMessagesModal user={messageUser!} handleModalClose={() => setShowMessagesModal(false)} />}
    </>
  );
};

export default UsersTable;
