import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import { IAction, ActionType } from "../interfaces/IAction";
import { columnsForActionsTable, filterColumnsForActionsTable, typeMappingWithUndefined } from "../common/helpers";
import TableComponent from "../components/tables/actionsTableComponent";
import { TableContainer } from "../UI/styled/tables";

const ActionsHistory = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [columns, setColumns] = useState<string[]>(columnsForActionsTable);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const fetchActions = async () => {
    try {
      const actionType: ActionType | undefined =
        typeMappingWithUndefined[selectedType];

      const response = await ActionsService.fetchActions(true, actionType);
      const responseData = response.data;

      setActions(responseData.actions);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
    setColumns(filterColumnsForActionsTable(false));
  }, [selectedType]);

  return (
    <TableContainer>
      <div>
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
          }}
        >
          <option value="ALL">All</option>
          {Object.values(ActionType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {actions?.length ? (
        <TableComponent columns={columns} actions={actions} />
      ) : (
        <div style={{ color: "red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>No actions found</div>
      )}
    </TableContainer>
  );
};

export default ActionsHistory;
