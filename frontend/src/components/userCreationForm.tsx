import React, { useEffect, useState } from "react";
import UsersService from "../services/usersService";
import { IRole, UserCreationDto } from "../interfaces/IUser";
import { CreationContainerA } from "../UI/styled/cards";
import { BasicInput, BasicLable, BasicSelect } from "../UI/styled/inputs";
import { PinkBlueButton } from "../UI/styled/buttons";

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
    <CreationContainerA>
      <h3 style={{ marginRight: "10px" }}>Create New User</h3>
      <BasicLable htmlFor="userName">User Name:</BasicLable>
      <BasicInput
        type="text"
        id="userName"
        name="userName"
        value={userName}
        onChange={(e) => handleUserNameChange(e)}
        required
      />
        <BasicLable htmlFor="email">Email:</BasicLable>
        <BasicInput
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          required
        />
      <BasicLable htmlFor="password">Password:</BasicLable>
      <BasicInput
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => handlePasswordChange(e)}
        required
      />
      <BasicLable htmlFor="role" style={{ marginRight: "10px" }}>
        Select a Role:
      </BasicLable>
      <BasicSelect
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
      </BasicSelect>
      <PinkBlueButton type="submit" onClick={(e) => handleSubmit(e)}>
        Create User
      </PinkBlueButton>
    </CreationContainerA>
  );
}

export default UserCreationForm;
