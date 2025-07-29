import React, { useContext } from "react";
import { GreetingsComponent } from "../../atomic/organisms/interactive";
import { Context } from "../..";
import UsersPage from "./usersPage";
import ActionsActivePage from "./actionsActivePage";
import ActionsHistoryPage from "./actionsHistoryPage";
import AuditLogsPage from "./auditLogsPage";
import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import { LogoutButton } from "../../atomic/molecules/auth";

const TablesPage: React.FC = () => {
  const { store } = useContext(Context);
  const [selectedTable, setSelectedTable] = React.useState<string>("users");

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8} item sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <ButtonGroup variant="text">
            <Button onClick={() => handleTableChange("users")}>Users</Button>
            <Button onClick={() => handleTableChange("actions")}>Actions</Button>
            <Button onClick={() => handleTableChange("history")}>Actions history</Button>
            <Button onClick={() => handleTableChange("fun")}>Fun</Button>
            {store.user.role.name === "Admin" && (
              <Button onClick={() => handleTableChange("logs")}>Audit logs</Button>
            )}
          </ButtonGroup>
        </Grid>
        <Grid xs={4} item sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <LogoutButton />
        </Grid>
        <Grid xs={12} item>
          {selectedTable === "fun" && <GreetingsComponent />}
          {selectedTable === "users" && <UsersPage />}
          {selectedTable === "actions" && <ActionsActivePage />}
          {selectedTable === "history" && <ActionsHistoryPage />}
          {selectedTable === "logs" && <AuditLogsPage />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TablesPage;
