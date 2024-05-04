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
import { GiveItemToUserFromAdminDto, IItem } from "../interfaces/IItem";
import ActionsService from "../services/actionsService";
import { ActionRequest } from "../interfaces/ActionRequest";
import { ActionType } from "../interfaces/IAction";
import UserCreationForm from "../components/userCreationForm";
import RolesCreationForm from "../components/rolesCreationForm";
import Modal from "../common/modal";
import UserMessagesModal from "../components/modals/messagerModal";
import { TableContainer } from "../UI/styled/tables";
import { BasicLable, BasicSelect } from "../UI/styled/inputs";
import { BasicRow } from "../UI/styled/cards";
import PaginationComponent from "../components/paginationComponent";
import UserEditModal from "../components/modals/userEditModal";
import UsersTableComponent from "../components/tables/usersTableComponent";
import GivingItemModal from "../components/modals/givingItemModal";

const UsersTable = () => {
  /* <---------------------------------------------- STORE ----------------------------------------------> */
  const { store } = useContext(Context);
  /* <---------------------------------------------- MODALS ---------------------------------------------> */
  const [showMessagesModal, setShowMessagesModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showGiveItemModal, setShowGiveItemModal] = useState<boolean>(false);
  /* <---------------------------------------------- ENTITIES -------------------------------------------> */
  const [users, setUsers] = useState<IUser[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  /* <------------------------------------------- PAGINATION --------------------------------------------> */
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [role, setRole] = useState<number>(2);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState<number>(10);

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
        senderId: store.user.id,
      };
      console.log(request);
      const users = await UsersService.fetchUsers(request);
      const items = await ActionsService.getItems(store.user.id);
      setUsers(users);
      setItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [page, limit, role, selectedRowsPerPage]);

  const handleSubmitUserCreation = async (formData: UserCreationDto) => {
    try {
      await UsersService.createUser(formData);
      await fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEditModalClick = (user: IUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleOpenItemModalClick = (user: IUser) => {
    setSelectedUser(user);
    setShowGiveItemModal(true);
  };
  const handleOpenMessagesModalClick = (user: IUser) => {
    setSelectedUser(user);
    setShowMessagesModal(true);
  };

  const handleSaveEdit = async (userToUpdate: IUser) => {
    try {
      const request: ChangeUserDto = {
        id: userToUpdate.id,
        userName: userToUpdate.userName,
        email: userToUpdate.email,
        password: userToUpdate.password,
        roleId: userToUpdate.role.id,
      };

      await UsersService.updateUser(request);
      await fetchUsers();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {store.user.role.name === "Admin" && (
        <UserCreationForm handleSubmitUserCreation={handleSubmitUserCreation} />
      )}
      {store.user.role.name === "Admin" && <RolesCreationForm />}
      {users.length !== 0 && (
        <>
          <TableContainer>
            <BasicRow>
              <BasicLable>Rows per page:</BasicLable>
              <BasicSelect
                value={selectedRowsPerPage}
                onChange={(e) => setSelectedRowsPerPage(Number(e.target.value))}
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </BasicSelect>
            </BasicRow>
            <PaginationComponent currentPage={page} onPageChange={setPage} />

            <BasicRow>
              <BasicLable>Filter by role:</BasicLable>
              <BasicSelect
                id="roleFilter"
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </BasicSelect>
            </BasicRow>

            <UsersTableComponent
              users={users}
              onClickEdit={handleOpenEditModalClick}
              onClickMessage={handleOpenMessagesModalClick}
              onClickItem={handleOpenItemModalClick}
            />
          </TableContainer>
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
        <UserEditModal
          user={selectedUser!}
          onClose={() => setShowEditModal(false)}
          roles={roles}
          onSave={handleSaveEdit}
        />
      )}
      {showMessagesModal && (
        <UserMessagesModal
          user={selectedUser!}
          handleModalClose={() => setShowMessagesModal(false)}
        />
      )}
      {showGiveItemModal && (
        <GivingItemModal
          userReceiving={selectedUser!}
          onClose={() => setShowGiveItemModal(false)}
        />
      )}
    </>
  );
};

export default UsersTable;
