import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import { IAction, ActionType } from "../interfaces/IAction.interface";
import {
  columnsForActionsTable,
  filterColumnsForActionsTable,
  typeMappingWithUndefined,
} from "../common/helpers";
import TableComponent from "../components/tables/actionsTableComponent";
import { FetchActionsRequest } from "../interfaces/api-interfaces/ActionsApi.interface";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

const ActionsHistory = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [columns, setColumns] = useState<string[]>(columnsForActionsTable);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);
  const [totalActions, setTotalActions] = useState<number>(0);

  const fetchActions = async () => {
    try {
      const actionType: ActionType | undefined =
        typeMappingWithUndefined[selectedType];
      const request: FetchActionsRequest = {
        active: false,
        type: actionType,
        userId: store.user.id,
        limit,
        page: page - 1,
      };
      const response = await ActionsService.fetchActions(request);

      setActions(response.actions);
      setTotalActions(response.count || 0);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
    setColumns(filterColumnsForActionsTable(false));
  }, [selectedType, limit, page]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={selectedType}
            size="small"
            label="Type"
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
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

      <Grid item xs={1}>
        <FormControl>
          <InputLabel>Rows:</InputLabel>
          <Select
            value={limit}
            label="Rows"
            size="small"
            onChange={(e) => {
              setLimit(Number(e.target.value));
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
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          count={Math.ceil(totalActions / limit) || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TableComponent columns={columns} actions={actions} />
      </Grid>
    </Grid>
  );
};

export default ActionsHistory;
