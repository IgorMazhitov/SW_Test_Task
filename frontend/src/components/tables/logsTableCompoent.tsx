import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {
  formatRequestForLogs,
  formatResponseForLogs,
} from "../../common/helpers";
import { IAudit } from "../../interfaces/IAudit";

interface LogsTableComponentProps {
  logs: IAudit[];
}

const LogsTableComponent: React.FC<LogsTableComponentProps> = ({ logs }) => {
  const formattedLogs = logs.map((log) => {
    return {
      ...log,
      requestData: formatRequestForLogs(JSON.stringify(log.requestData)),
      responseData: formatResponseForLogs(JSON.stringify(log.responseData)),
    };
  });
  return (
    <TableContainer component={Paper} sx={{
      maxHeight: "75vh",
    }}>
      <Table sx={{ minWidth: "100%", margin: 0 }} aria-label="simple table">
      <TableHead sx={{
        backgroundColor: "black",
      }}>
        <TableRow>
          <TableCell sx={{ color: "white" }}>Email</TableCell>
          <TableCell sx={{ color: "white" }}>Id</TableCell>
          <TableCell sx={{ color: "white" }}>Type</TableCell>
          <TableCell sx={{ color: "white" }}>Created At</TableCell>
          <TableCell sx={{ color: "white" }}>Request</TableCell>
          <TableCell sx={{ color: "white" }}>Response</TableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {formattedLogs.map((log) => (
          <tr key={log.id}>
            <TableCell>{log.email}</TableCell>
            <TableCell>{log.id}</TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell>{log.createdAt.toLocaleString()}</TableCell>
            <TableCell sx={{  wordBreak: "break-word"}}>{log.requestData}</TableCell>
            <TableCell>{log.responseData}</TableCell>
          </tr>
        ))}
      </tbody>
      </Table>
      
    </TableContainer>
  );
};

export default LogsTableComponent;
