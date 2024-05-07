import React, { useContext, useState, useEffect } from "react";
import { ActionType, IAction } from "../interfaces/IAction.interface";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import {
  columnsForActionsTable,
  filterColumnsForActionsTable,
  typeMappingWithUndefined,
} from "../common/helpers";
import NewActionRequest from "../components/actionRequestForm";
import {
  ActionRequest,
  ApproveActionRequest,
  DeclineActionRequest,
  FetchActionsRequest,
} from "../interfaces/api-interfaces/ActionsApi.interface";
import TableComponent from "../components/tables/actionsTableComponent";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import ItemCreationForm from "../components/itemCreationForm";

const ActionsTable = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [pendingActionsAmount, setPendingActionsAmount] = useState<number>(0);
  const [filteredColumnsForTable, setFilteredColumnsForTable] = useState<
    string[]
  >(columnsForActionsTable);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [totalActions, setTotalActions] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);

  useEffect(() => {
    fetchActions();
    setFilteredColumnsForTable(
      filterColumnsForActionsTable(store.user.role.name === "Admin")
    );
  }, [selectedType, limit, page]);

  const handleActionRequest = async (formData: ActionRequest) => {
    try {
      await ActionsService.requestActionUser(formData);
      fetchActions();
    } catch (error) {
      console.error("Error requesting action:", error);
    }
  };

  const fetchActions = async () => {
    try {
      const actionType: ActionType | undefined =
        typeMappingWithUndefined[selectedType];
      const request: FetchActionsRequest = {
        active: true,
        type: actionType,
        userId: store.user.id,
        limit,
        page: page - 1,
      };
      console.log("request", request)
      const response = await ActionsService.fetchActions(request);

      setActions(response.actions);
      setTotalActions(response.count || 0);
      if (response.count !== undefined && response.count !== null) {
        setPendingActionsAmount(response.count || 0);
      }
    } catch (error: any) {
      console.error("Error fetching actions:", error.data.message);
    }
  };

  const handleApproveAction = async (actionId: number) => {
    try {
      const request: ApproveActionRequest = {
        actionId,
        userId: store.user.id,
      };
      await ActionsService.approveAction(request);
      fetchActions();
    } catch (error) {
      console.error("Error approving action:", error);
    }
  };

  const handleDeclineAction = async (actionId: number) => {
    try {
      const request: DeclineActionRequest = {
        actionId,
        userId: store.user.id,
      };
      await ActionsService.declineAction(request);
      fetchActions();
    } catch (error) {
      console.error("Error declining action:", error);
    }
  };

  return (
    <Grid container xs={12} rowGap={2}>
      {store.user.role.name === "User" && (
        <Grid item xs={12}>
          <NewActionRequest handleActionRequest={handleActionRequest} />
        </Grid>
      )}
      {store.user.role.name === "Admin" && (
        <Grid item xs={12}>
          <ItemCreationForm onCreation={fetchActions} />
        </Grid>
      )}
      <Grid container item component={Paper} elevation={2} xs={12}>
        <Grid item xs={4} sx={{
          padding: "10px",
        }}>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              size="small"
              label="Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="ALL">All</MenuItem>
              {Object.values(ActionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {pendingActionsAmount !== 0 && store.user.role.name === "Admin" && (
          <Grid item xs={4} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography>
              Pending Actions Amount: {pendingActionsAmount}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <InputLabel>Rows:</InputLabel>
          <Select
            value={limit}
            label="Rows"
            size="small"
            onChange={(e) => {
              setLimit(Number(e.target.value))
            }}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={5} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      
      }}>
        <Pagination
          count={Math.ceil(totalActions / limit) || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TableComponent
          actions={actions}
          columns={filteredColumnsForTable}
          handleApproveAction={handleApproveAction}
          handleDeclineAction={handleDeclineAction}
        />
      </Grid>
    </Grid>
  );
};

export default ActionsTable;
