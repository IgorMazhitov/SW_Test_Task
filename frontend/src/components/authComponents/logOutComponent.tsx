import { useContext } from "react";
import { Context } from "../..";
import { BluePinkButton } from "../../UI/styled/buttons";

const LogOutComponent = () => {
  const { store } = useContext(Context);
  return (
    <BluePinkButton onClick={() => store.logout()}>Log Out</BluePinkButton>
  );
};

export default LogOutComponent;