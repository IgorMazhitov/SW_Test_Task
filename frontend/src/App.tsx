import { useContext } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import AuthPage from "./pages/authPage";
import LogOutComponent from "./components/authComponents/logOutComponent";
import { LogOutCover } from "./UI/styled/buttons";
import TablesPage from "./pages/tablesPage";

function App() {
  const { store } = useContext(Context);

  const isUserLoggedIn = store.isAuth;

  if (!isUserLoggedIn) {
    return <AuthPage />;
  } else {
    return (
      <>
        <LogOutCover>
          <LogOutComponent />
        </LogOutCover>
        <TablesPage />
      </>
    );
  }
}

export default observer(App);
