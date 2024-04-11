import { useContext } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import AuthForm from "./auth/authPage";
import MainTable from "./tables/mainTable";

function App() {
  const { store } = useContext(Context);

  if (!store.isAuth) {
    return (
      <AuthForm />
    )
  } else {
    return (
      <MainTable/>
    )
  }

  return (
    <div className="App">
      <p>Authorized ${store.user.email}</p>
    </div>
  );
}

export default observer(App);
