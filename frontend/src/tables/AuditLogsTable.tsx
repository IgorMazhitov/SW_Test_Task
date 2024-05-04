import React, { useState, useEffect } from "react";
import { IAudit } from "../interfaces/IAudit";
import LogsService from "../services/logsService";
import LogsTableComponent from "../components/tables/logsTableCompoent";
import EmptyTableComponent from "../components/tables/emptyTableComponent";
import { TableContainer } from "../UI/styled/tables";
import { formatRequestForLogs } from "../common/helpers";
import PaginationComponent from "../components/paginationComponent";
import { BasicInput, BasicSelect } from "../UI/styled/inputs";
import { BasicHeader } from "../UI/styled/fonts";
import { BasicRow } from "../UI/styled/cards";

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

  return (
    <TableContainer>
      <BasicRow>
        <BasicHeader>Audit Logs</BasicHeader>
        <BasicHeader>total: {totalLogs}</BasicHeader>
      </BasicRow>
      {auditLogs.length > 0 && (
        <>
          <BasicInput
            type="text"
            placeholder="Filter by Email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />

          <BasicRow>
            Rows per page:
            <BasicSelect
              value={selectedRowsPerPage}
              onChange={(e) => setSelectedRowsPerPage(Number(e.target.value))}
              style={{ marginLeft: "5px" }}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </BasicSelect>
          </BasicRow>
          <PaginationComponent currentPage={page} onPageChange={setPage} />
          <LogsTableComponent logs={auditLogs} />
        </>
      )}
      {auditLogs.length === 0 && <EmptyTableComponent name="Audit" />}
    </TableContainer>
  );
};

export default AuditLogTable;
