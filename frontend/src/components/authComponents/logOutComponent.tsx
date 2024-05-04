import { useContext } from "react";
import { Context } from "../..";
import { Button } from "@mui/material";

const LogOutComponent = () => {
  const { store } = useContext(Context);
  return (
    <Button variant="outlined" onClick={() => store.logout()}>
      Log Out
    </Button>
  );
};

export default LogOutComponent;
