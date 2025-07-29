import React, { useState, useEffect } from "react";
import LogsService from "../../services/logsService";
import { LogsTable } from "../../atomic/organisms/tables";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardTemplate } from "../../atomic/templates";
import { IAuditLog } from "../../types/audit.types";

const AuditLogsPage = () => {
  const [auditLogs, setAuditLogs] = useState<IAuditLog[]>([]);
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState<number>(10);
  const fakeLogs: IAuditLog[] = [
    {
      id: 1,
      userId: 0,
      email: "",
      action: "",
      entity: "",
      timestamp: new Date(),
      type: "request",
      request: "",
      response: "",
    },
  ];

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
    <DashboardTemplate title="Audit Logs">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl>
            <TextField
              type="text"
              label="Email"
              size="small"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Typography>Total: {totalLogs}</Typography>
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <InputLabel>Rows:</InputLabel>
            <Select
              value={selectedRowsPerPage}
              label="Rows"
              size="small"
              onChange={(e) => setSelectedRowsPerPage(Number(e.target.value))}
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Pagination
            count={Math.ceil(totalLogs / selectedRowsPerPage) || 1}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Grid>
        {auditLogs.length > 0 && (
          <Grid item xs={12}>
            <LogsTable logs={auditLogs} />
          </Grid>
        )}
        {auditLogs.length === 0 && (
          <Grid item xs={12} sx={{ minWidth: "100%" }}>
            <LogsTable logs={fakeLogs} />
          </Grid>
        )}
      </Grid>
    </DashboardTemplate>
  );
};

export default AuditLogsPage;
