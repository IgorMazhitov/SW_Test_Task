import React, { useState, useEffect } from "react";
import { IAudit } from "../interfaces/IAudit";
import LogsService from "../services/logsService";
import LogsTableComponent from "../components/tables/logsTableCompoent";
import EmptyTableComponent from "../components/emptyTableComponent";
import { TableContainer } from "../UI/styled/tables";

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
    <TableContainer>
      {auditLogs.length > 0 && (
        <>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Audit Logs
          </h2>
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
          <LogsTableComponent logs={auditLogs} />
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
        </>
      )}
      {auditLogs.length === 0 && <EmptyTableComponent name="Audit" />}
    </TableContainer>
  );
};

export default AuditLogTable;
