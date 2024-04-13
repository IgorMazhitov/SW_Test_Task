import React, { useContext, useState, useEffect } from "react";
import { ActionType, IAction } from "../interfaces/IAction";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import { typeMappingWithUndefined } from "../common/helpers";
import NewActionRequest from "../components/actionRequestForm";
import { ActionRequest } from "../interfaces/ActionRequest";

const ActionsTable = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [pendingActionsAmount, setPendingActionsAmount] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  useEffect(() => {
    fetchActions();
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

      const response = await ActionsService.fetchActions(false, actionType);
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
      await ActionsService.approveAction(actionId);
      fetchActions();
    } catch (error) {
      console.error("Error approving action:", error);
    }
  };

  const handleDeclineAction = async (actionId: number) => {
    try {
      await ActionsService.declineAction(actionId);
      fetchActions();
    } catch (error) {
      console.error("Error declining action:", error);
    }
  };

  return (
    <div>
      {store.user.role.name === "Admin" && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
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
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Type</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                User ID
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Requested Time
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Approved
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Approved Time
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Approved By
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Item IDs
              </th>
              {store.user.role.name === "Admin" && (
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.type}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.userId}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.requestedTime
                    ? new Date(action.requestedTime).toLocaleString()
                    : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.approved ? "Yes" : "No"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.approvedTime
                    ? new Date(action.approvedTime).toLocaleString()
                    : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.approvedBy ? action.approvedBy : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {action.itemId ? action.itemId : "-"}
                </td>
                {store.user.role.name === "Admin" && (
                  <>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {!action.approved && (
                        <button onClick={() => handleApproveAction(action.id)}>
                          Approve
                        </button>
                      )}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {!action.approved && (
                        <button onClick={() => handleDeclineAction(action.id)}>
                          Decline
                        </button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default ActionsTable;
