import React, { useContext, useState } from "react";
import UsersTable from "./UsersTable";
import { Context } from "..";
import ActionsTable from "./ActionsActiveTable";
import ActionsHistory from "./ActionsHistoryTable";
import AuditLogTable from "./AuditLogsTable";
import { TableSelectButton } from "../UI/buttons";

const MainTable = () => {
  const [selectedTable, setSelectedTable] = useState("users");
  const { store } = useContext(Context);

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <TableSelectButton
          tableName="users"
          callback={() => handleTableChange("users")}
        />
        <TableSelectButton
          tableName="actions pending"
          callback={() => handleTableChange("actions")}
        />
        <TableSelectButton
          tableName="actions history"
          callback={() => handleTableChange("history")}
        />
        {store.user.role.name === "Admin" && (
          <TableSelectButton
            tableName="logs"
            callback={() => handleTableChange("logs")}
          />
        )}
      </div>
      ;
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        {selectedTable === "users" && <UsersTable />}
        {selectedTable === "actions" && <ActionsTable />}
        {selectedTable === "history" && <ActionsHistory />}
        {selectedTable === "logs" && <AuditLogTable />}
      </div>
    </div>
  );
};

export default MainTable;
