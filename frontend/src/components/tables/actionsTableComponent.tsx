import exp from "constants";
import { Table, TableCell, TableHead } from "../../UI/styled/tables";
import { IAction } from "../../interfaces/IAction";

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
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => {
            return <TableHead>{column}</TableHead>;
          })}
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => (
          <tr key={action.id}>
            {columns.map((column: string) => {
              if (column === "approve") {
                return (
                  <TableCell>
                    <button onClick={() => handleApproveAction!(action.id)}>
                      Approve
                    </button>
                  </TableCell>
                );
              } else if (column === "decline") {
                return (
                  <TableCell>
                    <button onClick={() => handleDeclineAction!(action.id)}>
                      Decline
                    </button>
                  </TableCell>
                );
              } else if (column === "approved") {
                return (
                  <TableCell>
                    {action.approved ? "Approved" : "Not Approved"}
                  </TableCell>
                );
              } else {
                console.log(column, "column", action);
                return (
                  <TableCell>
                    {(action as any)[column] ? (action as any)[column] : " - "}
                  </TableCell>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
