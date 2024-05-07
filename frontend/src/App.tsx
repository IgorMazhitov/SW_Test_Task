import { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import AuthPage from "./pages/authPage";
import LogOutComponent from "./components/authComponents/logOutComponent";
import TablesPage from "./pages/tablesPage";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const isUserLoggedIn = store.isAuth;

  if (!isUserLoggedIn) {
    return <AuthPage />;
  } else {
    return <TablesPage />;
  }
}

export default observer(App);
