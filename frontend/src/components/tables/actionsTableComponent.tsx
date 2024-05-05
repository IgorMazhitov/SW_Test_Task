import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IAction } from "../../interfaces/IAction.interface";
import { fakeActions } from "../../common/helpers";

interface TableComponentProps {
  actions: IAction[];
  columns: string[];
  handleApproveAction?: (id: number) => void;
  handleDeclineAction?: (id: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { actions, handleApproveAction, handleDeclineAction, columns } = props;
  let validActions = actions
  if (!validActions) {
    validActions = fakeActions;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", margin: 0 }} aria-label="simple table">
        <TableHead sx={{
          backgroundColor: "black",
        }}>
          <TableRow>
            {columns.map((column) => {
              return <TableCell sx={{ color: "white" }} key={column}>{column}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <tbody>
          {validActions.map((action) => (
            <tr key={action.id}>
              {columns.map((column: string) => {
                if (column === "approve") {
                  return (
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleApproveAction!(action.id)}>
                        Approve
                      </Button>
                    </TableCell>
                  );
                } else if (column === "decline") {
                  return (
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleDeclineAction!(action.id)}>
                        Decline
                      </Button>
                    </TableCell>
                  );
                } else if (column === "approved") {
                  return (
                    <TableCell>
                      {action.approved ? "Approved" : "Not Approved"}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell>
                      {(action as any)[column]
                        ? (action as any)[column]
                        : " - "}
                    </TableCell>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
