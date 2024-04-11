import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import ActionsService from '../services/actionsService';
import { IAction } from '../interfaces/IAction';

const ActionsHistory = () => {
  const { store } = useContext(Context);
  const [actions, setActions] = useState<IAction[]>([]);

  const fetchActions = async () => {
    try {
      const response = await ActionsService.fetchActions(true); 
      setActions(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

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
        <div>No actions found</div>
      )}
    </div>
  );
};

export default ActionsHistory;
