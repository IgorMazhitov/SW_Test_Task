// Import necessary modules if not already imported
import React, { useContext, useState, useEffect } from 'react';
import { IAction } from '../interfaces/IAction';
import { Context } from '..';
import ActionsService from '../services/actionsService';

const ActionsTable = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const fetchActions = async () => {
    try {
      const response = await ActionsService.fetchActions(false);
      setActions(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const handleCreateItem = async () => {
    try {
      // Check if name and description are not empty
      if (!itemName.trim() || !itemDescription.trim()) {
        console.error("Name and description are required");
        return;
      }

      const newItem = await ActionsService.createItem(
        itemName,
        itemDescription
      );
      console.log("Item created:", newItem);

      setItemName("");
      setItemDescription("");

      fetchActions();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleApproveAction = async (actionId: number) => {
    try {
      // Call your service method to approve the action by ID
      await ActionsService.approveAction(actionId);
      // Refresh actions after approval
      fetchActions();
    } catch (error) {
      console.error("Error approving action:", error);
    }
  };

  const handleDeclineAction = async (actionId: number) => {
    try {
      // Call your service method to approve the action by ID
      await ActionsService.declineAction(actionId);
      // Refresh actions after approval
      fetchActions();
    } catch (error) {
      console.error("Error approving action:", error);
    }
  };

  return (
    <div>
      {actions.length ? (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
        <div>No actions found</div>
      )}
      {store.user.role.name === "Admin" && (
        <div style={{ marginTop: "20px" }}>
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
    </div>
  );
};

export default ActionsTable;
