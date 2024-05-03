import React, { useState, useEffect } from "react";
import { IAudit } from "../interfaces/IAudit";
import LogsService from "../services/logsService";

const AuditLogTable = () => {
  const [auditLogs, setAuditLogs] = useState<IAudit[]>([]);
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalLogs, setTotalLogs] = useState<number>(0); 
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]); 
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const { logs, total } = await LogsService.getAllLogs({
          email: emailFilter,
          page,
          limit: selectedRowsPerPage, 
        });
        setAuditLogs(logs);
        setTotalLogs(total);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    fetchAuditLogs();
  }, [emailFilter, page, selectedRowsPerPage]); 

  function formatRequestForLogs(jsonRequest: string) {
    const request = JSON.parse(jsonRequest);
    const { url, method, body } = request;
    const formattedRequestBody = JSON.stringify(body);

    return `${method} ${url} \n ${
      formattedRequestBody !== "{}" ? formattedRequestBody : "No request body"
    }`;
  }

  function formatResponseForLogs(jsonResponse: string) {
    const response = JSON.parse(jsonResponse);
    if (!response) {
      return `Response is void`;
    }
    const { status } = response;
    return `Status: ${status}`;
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
      <input
        type="text"
        placeholder="Filter by Email"
        value={emailFilter}
        onChange={(e) => setEmailFilter(e.target.value)}
        style={{ marginBottom: "10px", marginLeft: "10px" }}
      />
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        Total Logs: {totalLogs}
      </div>
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        Rows per page:
        <select
          value={selectedRowsPerPage}
          onChange={(e) => setSelectedRowsPerPage(Number(e.target.value))}
          style={{ marginLeft: "5px" }}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
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
                {log.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {log.type}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  maxWidth: "30vw",
                  wordWrap: "break-word",
                }}
              >
                {formatRequestForLogs(JSON.stringify(log.requestData))}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {formatResponseForLogs(JSON.stringify(log.responseData))}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={auditLogs.length < selectedRowsPerPage}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditLogTable;
