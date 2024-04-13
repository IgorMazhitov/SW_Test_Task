import React, { useEffect, useState } from "react";
import UsersService from "../services/usersService";
import { IRole, UserCreationDto } from "../interfaces/IUser";

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
      setRoles(roles.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e: any) => {
    setRole(e.target.value);
  };

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
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "10px" }}>Create New User</h3>
      <form
        id="userCreationForm"
        onSubmit={handleSubmit}
        style={{ display: "flex" }}
      >
        <div style={{ marginRight: "10px" }}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => handleUserNameChange(e)}
            required
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            required
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="role" style={{ marginRight: "10px" }}>
            Select a Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
            style={{ marginRight: "10px" }}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            minWidth: "max-content"
          }}
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default UserCreationForm;
