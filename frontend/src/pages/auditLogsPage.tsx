import React, { useState, useEffect } from "react";
import { IAudit } from "../interfaces/IAudit.interface";
import LogsService from "../services/logsService";
import LogsTableComponent from "../components/tables/logsTableCompoent";
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

const AuditLogTable = () => {
  const [auditLogs, setAuditLogs] = useState<IAudit[]>([]);
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [rowsPerPageOptions] = useState<number[]>([10, 20, 30, 40, 50]);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState<number>(10);
  const fakeLogs: IAudit[] = [
    {
      id: 1,
      email: "",
      type: "request",
      createdAt: new Date(),
      requestData: "",
      responseData: "",
    }
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

      <Grid item xs={2} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
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
      <Grid item xs={5} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      
      }}>
        <Pagination
          count={Math.ceil(totalLogs / selectedRowsPerPage) || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
      {auditLogs.length > 0 && (
        <Grid item xs={12}>
          <LogsTableComponent logs={auditLogs} />
        </Grid>
      )}
      {auditLogs.length === 0 && (
        <Grid item xs={12} sx={{
          minWidth: "100%",
        }}>
          <LogsTableComponent logs={fakeLogs} />
        </Grid>
      )}
    </Grid>
  );
};

export default AuditLogTable;
