import React, { useState, useEffect } from "react";
import { IAudit } from "../interfaces/IAudit";
import LogsService from "../services/logsService";

const AuditLogTable = () => {
  const [auditLogs, setAuditLogs] = useState<IAudit[]>([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await LogsService.getAllLogs();
        setAuditLogs(response.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    fetchAuditLogs();
  }, []);

  function formatRequestForLogs(jsonRequest: string) {
    const request = JSON.parse(jsonRequest);
    const { url, method, userEmail, timestamp } = request;
    const formattedTimestamp = new Date(timestamp).toLocaleString();

    return `URL: ${url}\nMethod: ${method}\nUser Email: ${userEmail}\nTimestamp: ${formattedTimestamp}`;
  }

  function getEmail(jsonRequest: string) {
    const request = JSON.parse(jsonRequest);
    const { userEmail } = request;
    return userEmail;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        border: "2px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Audit Logs</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Request Data
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Response Data
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map((log) => (
            <tr key={log.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {getEmail(JSON.stringify(log.requestData))}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {log.type}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {formatRequestForLogs(JSON.stringify(log.requestData))}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {log.responseData ? JSON.stringify(log.responseData) : "-"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogTable;
