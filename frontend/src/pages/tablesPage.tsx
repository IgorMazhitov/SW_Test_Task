import React, { useContext } from "react";
import GreetingsComponent from "../components/greetingsComponent";
import { Context } from "..";
import UsersTable from "./usersPage";
import ActionsTable from "./actionsActivePage";
import ActionsHistory from "./actionsHistoryPage";
import AuditLogTable from "./auditLogsPage";
import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import LogOutComponent from "../components/authComponents/logOutComponent";

interface TablesPageProps {}

const TablesPage: React.FC<TablesPageProps> = () => {
  const { store } = useContext(Context);
  const [selectedTable, setSelectedTable] = React.useState<string>("users");

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          xs={8}
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonGroup variant="text">
            <Button onClick={() => handleTableChange("users")}>Users</Button>
            <Button onClick={() => handleTableChange("actions")}>
              Actions
            </Button>
            <Button onClick={() => handleTableChange("history")}>
              Actions history
            </Button>
            <Button onClick={() => handleTableChange("fun")}>Fun</Button>
            {store.user.role.name === "Admin" && (
              <Button onClick={() => handleTableChange("logs")}>
                Audit logs
              </Button>
            )}
          </ButtonGroup>
        </Grid>
        <Grid
          xs={4}
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogOutComponent />
        </Grid>
        <Grid xs={12} item>
          {selectedTable === "fun" && (
            <GreetingsComponent/>
          )}
          {selectedTable === "users" && <UsersTable />}
          {selectedTable === "actions" && <ActionsTable />}
          {selectedTable === "history" && <ActionsHistory />}
          {selectedTable === "logs" && <AuditLogTable />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TablesPage;
