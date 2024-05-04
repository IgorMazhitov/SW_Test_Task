import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import UsersService from "../services/usersService";
import UserCreationForm from "../components/userCreationForm";
import RolesCreationForm from "../components/rolesCreationForm";
import UserMessagesModal from "../components/modals/messagerModal";
import UserEditModal from "../components/modals/userEditModal";
import UsersTableComponent from "../components/tables/usersTableComponent";
import GivingItemModal from "../components/modals/givingItemModal";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { ChangeUserDto, GetUsersDto, UserCreationDto } from "../interfaces/api-interfaces/UsersApi.interface";
import { IUser } from "../interfaces/IUser.interface";
import { IRole } from "../interfaces/IRole.interface";

const UsersTable = () => {
  /* <---------------------------------------------- STORE ----------------------------------------------> */
  const { store } = useContext(Context);
  /* <---------------------------------------------- MODALS ---------------------------------------------> */
  const [showMessagesModal, setShowMessagesModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showGiveItemModal, setShowGiveItemModal] = useState<boolean>(false);
  /* <---------------------------------------------- ENTITIES -------------------------------------------> */
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  /* <------------------------------------------- PAGINATION --------------------------------------------> */
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [role, setRole] = useState<number>(2);
  const limitOptions = [10, 20, 30, 40, 50]

  const fetchRoles = async () => {
    try {
      const roles = await UsersService.fetchRoles();
      setRoles(roles);
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
      const { users, count } = await UsersService.fetchUsers(request);
      setUsers(users);
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [page, limit, role, limit]);

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {store.user.role.name === "Admin" && (
            <UserCreationForm
              handleSubmitUserCreation={handleSubmitUserCreation}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {store.user.role.name === "Admin" && <RolesCreationForm />}
        </Grid>
        <Grid container item rowSpacing={2}>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel>Rows:</InputLabel>
              <Select
                value={limit}
                size="small"
                label="Rows"
                onChange={(e: any) =>
                  setLimit(Number(e.target.value))
                }
              >
                {limitOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel>Role:</InputLabel>
              <Select
                id="roleFilter"
                value={role}
                label="Role"
                size="small"
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
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              count={totalPages === 0 ? 1 : totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Grid>
          {users.length !== 0 && (
            <>
              <Grid item xs={12}>
                <UsersTableComponent
                  users={users}
                  onClickEdit={handleOpenEditModalClick}
                  onClickMessage={handleOpenMessagesModalClick}
                  onClickItem={handleOpenItemModalClick}
                />
              </Grid>
            </>
          )}
          {users.length === 0 && (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  xs={12}
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h2">
                    No users found
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
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
    </Box>
  );
};

export default UsersTable;
