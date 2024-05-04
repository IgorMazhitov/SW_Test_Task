import React, { useContext, useState, useEffect } from "react";
import { ActionType, IAction } from "../interfaces/IAction";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import {
  columnsForActionsTable,
  filterColumnsForActionsTable,
  typeMappingWithUndefined,
} from "../common/helpers";
import NewActionRequest from "../components/actionRequestForm";
import { ActionRequest, ApproveActionRequest, DeclineActionRequest, FetchActionsRequest } from "../interfaces/ActionRequest";
import TableComponent from "../components/tables/actionsTableComponent";
import { TableContainer } from "../UI/styled/tables";

const ActionsTable = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [pendingActionsAmount, setPendingActionsAmount] = useState<number>(0);
  const [filteredColumnsForTable, setFilteredColumnsForTable] = useState<
    string[]
  >(columnsForActionsTable);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  useEffect(() => {
    fetchActions();
    setFilteredColumnsForTable(
      filterColumnsForActionsTable(store.user.role.name === "Admin")
    );
  }, [selectedType]);

  const handleActionRequest = async (formData: ActionRequest) => {
    try {
      await ActionsService.requestActionUser(formData);
      fetchActions();
      // Optionally, you can handle success feedback to the user
      console.log("Action requested successfully!");
    } catch (error) {
      console.error("Error requesting action:", error);
    }
  };

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
      if (responseData.count !== undefined && responseData.count !== null) {
        setPendingActionsAmount(responseData.count || 0);
      }
    } catch (error: any) {
      console.error("Error fetching actions:", error.data.message);
    }
  };

  const handleCreateItem = async () => {
    try {
      if (!itemName.trim() || !itemDescription.trim()) {
        console.error("Name and description are required");
        return;
      }

      await ActionsService.createItem(itemName, itemDescription);

      setItemName("");
      setItemDescription("");

      fetchActions();
    } catch (error) {
      console.error("Error creating item:", error);
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
    <TableContainer>
      {store.user.role.name === "Admin" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(173, 216, 230, 0.5)",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "20px",
          }}
        >
          <label style={{ marginRight: "10px" }}>Item creation</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Item Description"
            style={{ marginRight: "10px" }}
          />
          <button className="btn btn-primary" onClick={handleCreateItem}>
            Create Item
          </button>
        </div>
      )}
      {store.user.role.name === "User" && (
        <NewActionRequest handleActionRequest={handleActionRequest} />
      )}
      <div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="ALL">All</option>
          {Object.values(ActionType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {pendingActionsAmount !== 0 && store.user.role.name === "Admin" && (
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#f2f2f2",
            padding: "10px",
          }}
        >
          Pending Actions Amount: {pendingActionsAmount}
        </div>
      )}

      {actions?.length ? (
        <TableComponent
          actions={actions}
          columns={filteredColumnsForTable}
          handleApproveAction={handleApproveAction}
          handleDeclineAction={handleDeclineAction}
        />
      ) : (
        <div
          style={{
            color: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No actions found
        </div>
      )}
    </TableContainer>
  );
};

export default ActionsTable;
