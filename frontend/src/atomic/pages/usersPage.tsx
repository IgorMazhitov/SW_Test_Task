import React, { useContext, useState, useEffect } from "react";
import UsersService from "../../services/usersService";
import { DashboardTemplate } from "../../atomic/templates";
import { UserCreationForm, RolesCreationForm } from "../../atomic/molecules/forms";
import { UserEditModal } from "../../atomic/molecules/modals/user";
import { UserMessagesModal } from "../../atomic/molecules/modals/message";
import { GiveItemModal } from "../../atomic/molecules/modals/item";
import { UsersTable as UsersTableComponent } from "../../atomic/organisms/tables";
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
import { GetUsersDto, UserCreationDto } from "../../types/api-interfaces/UsersApi.interface";
import { IUserUpdateRequest } from "../../types/user.types";
import { IUser } from "../../types/user.types";
import { IRole } from "../../types/role.types";
import { Context } from "../..";

const UsersPage = () => {
  const { store } = useContext(Context);
  const [showMessagesModal, setShowMessagesModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showGiveItemModal, setShowGiveItemModal] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [role, setRole] = useState<number>(2);
  const limitOptions = [10, 20, 30, 40, 50];

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

  const handleSaveEdit = async (userToUpdate: IUserUpdateRequest) => {
    try {
      await UsersService.updateUser(userToUpdate);
      await fetchUsers();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardTemplate title="Users Management">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {store.user.role.name === "Admin" && (
            <UserCreationForm onSubmit={handleSubmitUserCreation} />
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
                onChange={(e: any) => setLimit(Number(e.target.value))}
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
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Pagination
              count={totalPages === 0 ? 1 : totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Grid>
          {users.length !== 0 && (
            <>
              <Grid item xs={12} style={{ maxHeight: "70vh" }}>
                <UsersTableComponent
                  users={users}
                  onEdit={handleOpenEditModalClick}
                  onMessage={handleOpenMessagesModalClick}
                  onItem={handleOpenItemModalClick}
                />
              </Grid>
            </>
          )}
          {users.length === 0 && (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Grid xs={12} item sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="h2">No users found</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      {showEditModal && (
        <UserEditModal
          user={selectedUser!}
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          roles={roles}
          onSave={handleSaveEdit}
        />
      )}
      {showMessagesModal && (
        <UserMessagesModal user={selectedUser!} open={showMessagesModal} onClose={() => setShowMessagesModal(false)} />
      )}
      {showGiveItemModal && (
        <GiveItemModal userReceiving={selectedUser!} open={showGiveItemModal} onClose={() => setShowGiveItemModal(false)} />
      )}
    </DashboardTemplate>
  );
};

export default UsersPage;
