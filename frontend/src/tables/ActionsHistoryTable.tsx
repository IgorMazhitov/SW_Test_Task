import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import { IAction, ActionType } from "../interfaces/IAction";
import {
  columnsForActionsTable,
  filterColumnsForActionsTable,
  typeMappingWithUndefined,
} from "../common/helpers";
import TableComponent from "../components/tables/actionsTableComponent";
import { TableContainer } from "../UI/styled/tables";
import { FetchActionsRequest } from "../interfaces/ActionRequest";
import EmptyTableComponent from "../components/tables/emptyTableComponent";
import { BasicLable, BasicSelect } from "../UI/styled/inputs";
import { BasicRow } from "../UI/styled/cards";

const ActionsHistory = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [columns, setColumns] = useState<string[]>(columnsForActionsTable);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const fetchActions = async () => {
    try {
      const actionType: ActionType | undefined =
        typeMappingWithUndefined[selectedType];
      const request: FetchActionsRequest = {
        active: false,
        type: actionType,
        userId: store.user.id,
      };
      const response = await ActionsService.fetchActions(request);
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
      <BasicRow>
        <BasicLable>Actions type</BasicLable>
        <BasicSelect
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
        </BasicSelect>
      </BasicRow>

      {actions?.length ? (
        <TableComponent columns={columns} actions={actions} />
      ) : (
        <EmptyTableComponent name="History of actions" />
      )}
    </TableContainer>
  );
};

export default ActionsHistory;
