import React, { useContext, useState } from "react";
import UsersTable from "./UsersTable";
import { Context } from "..";
import ActionsTable from "./ActionsActiveTable";
import ActionsHistory from "./ActionsHistoryTable";
import AuditLogTable from "./AuditLogsTable";

const MainTable = () => {
  const [selectedTable, setSelectedTable] = useState("users");
  const { store } = useContext(Context);

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button
          style={{
            marginRight: "5px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleTableChange("users")}
        >
          Users
        </button>
        <button
          style={{
            marginRight: "5px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleTableChange("actions")}
        >
          Actions Pending
        </button>
        <button
          style={{
            marginRight: "5px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleTableChange("history")}
        >
          Actions History
        </button>
        {store.user.role.name === "Admin" && (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleTableChange("logs")}
          >
            Logs
          </button>
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
