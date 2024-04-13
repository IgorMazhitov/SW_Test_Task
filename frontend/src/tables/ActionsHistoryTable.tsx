import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import ActionsService from "../services/actionsService";
import { IAction, ActionType } from "../interfaces/IAction";
import { typeMappingWithUndefined } from "../common/helpers";

const ActionsHistory = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const fetchActions = async () => {
    try {
      const actionType: ActionType | undefined =
        typeMappingWithUndefined[selectedType];

      console.log(selectedType, "fetching", actionType);
      const response = await ActionsService.fetchActions(true, actionType);
      const responseData = response.data;

      setActions(responseData.actions);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
  }, [selectedType]);

  return (
    <div>
      <div>
        <select
          value={selectedType}
          onChange={(e) => {
            console.log(e.target.value);
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ color: "red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>No actions found</div>
      )}
    </div>
  );
};

export default ActionsHistory;
