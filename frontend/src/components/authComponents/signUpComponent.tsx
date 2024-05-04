import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../..";
import { IRole } from "../../interfaces/IUser";
import { observer } from "mobx-react-lite";
import { BlueButton, BluePinkButton } from "../../UI/styled/buttons";
import { BasicInput, BasicSelect, InputWrapper } from "../../UI/styled/inputs";
import { AuthFormWrapper } from "../../UI/styled/cards";

interface SignupProps {
  callback?: () => void;
}

const SignupComponent: React.FC<SignupProps> = ({ callback }) => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const roles: IRole[] = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];
  const [selectedRole, setSelectedRole] = useState(2);

  const { store } = useContext(Context);

  return (
    <AuthFormWrapper>
      <InputWrapper>
        <BasicInput
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
          placeholder="Username"
        />
        <BasicInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
        <BasicInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <div>
          <BasicSelect
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </BasicSelect>
        </div>
      </InputWrapper>
      <InputWrapper>
        <BlueButton
          onClick={() => store.signup(email, password, selectedRole, userName)}
        >
          SignUp
        </BlueButton>
        <BluePinkButton onClick={callback}>"Switch to LogIn"</BluePinkButton>
      </InputWrapper>
    </AuthFormWrapper>
  );
};

export default observer(SignupComponent);
