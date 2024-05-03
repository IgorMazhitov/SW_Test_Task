import React, { useContext } from "react";
import GreetingsComponent from "../components/greetingsComponent";
import { Context } from "..";
import UsersTable from "../tables/UsersTable";
import { BlueButton } from "../UI/styled/buttons";
import ActionsTable from "../tables/ActionsActiveTable";
import ActionsHistory from "../tables/ActionsHistoryTable";

interface TablesPageProps {}

const TablesPage: React.FC<TablesPageProps> = () => {
  const { store } = useContext(Context);
  const [selectedTable, setSelectedTable] = React.useState<string>("users");

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <BlueButton onClick={() => handleTableChange("users")}>
          Users
        </BlueButton>
        <BlueButton onClick={() => handleTableChange("actions")}>
          Actions
        </BlueButton>
        <BlueButton onClick={() => handleTableChange("history")}>
          Actions history
        </BlueButton>
        <BlueButton onClick={() => handleTableChange("fun")}>
          Fun 
        </BlueButton>
        {store.user.role.name === "Admin" && (
          <BlueButton onClick={() => handleTableChange("logs")}>
            Audit logs
          </BlueButton>
        )}
      </div>
      {selectedTable === "fun" && (
        <GreetingsComponent
          userName={store.user.userName}
          userRole={store.user.role.name}
        />
      )}
      {selectedTable === "users" && <UsersTable />}
      {selectedTable === "actions" && <ActionsTable />}
      {selectedTable === "history" && <ActionsHistory />}
    </>
  );
};

export default TablesPage;
