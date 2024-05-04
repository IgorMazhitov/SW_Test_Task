import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { BlueButton, BluePinkButton } from "../../UI/styled/buttons";
import { BasicInput, InputWrapper } from "../../UI/styled/inputs";
import { AuthFormWrapper } from "../../UI/styled/cards";

interface LoginProps {
  callback?: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({ callback }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <AuthFormWrapper>
      <InputWrapper>
        <BasicInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <BasicInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
      </InputWrapper>
      <InputWrapper>
        <BlueButton onClick={async () => store.login(email, password)}>
          Log In
        </BlueButton>
        <BluePinkButton onClick={callback}>"Switch to SignUp"</BluePinkButton>
      </InputWrapper>
    </AuthFormWrapper>
  );
};

export default observer(LoginComponent);
