/**
 * UsersTable organism for displaying user data
 */
import React, { useContext } from 'react';
import { TableRow } from '@mui/material';
import { IUser } from '../../../types/user.types';
import { UserHelpers } from '../../../shared/utils/helpers';
import TableCell from '../../atoms/table/TableCell';
import EmptyTableRow from '../../atoms/table/EmptyTableRow';
import { Table, TableActionButtons } from '../../molecules/table';
import { Context } from '../../../index';

/**
 * UsersTable props
 */
export interface UsersTableProps {
  /** Array of users to display */
  users: IUser[];
  
  /** Callback function for edit action */
  onEdit?: (user: IUser) => void;
  
  /** Callback function for message action */
  onMessage?: (user: IUser) => void;
  
  /** Callback function for item action */
  onItem?: (user: IUser) => void;
}

/**
 * Format column header text for display
 * @param column - Column name
 * @returns Formatted column header
 */
const formatColumnHeader = (column: string): string => {
  switch (column) {
    case 'id': return 'ID';
    case 'userName': return 'Username';
    case 'role': return 'Role';
    case 'email': return 'Email';
    case 'Actions': return 'Actions';
    default: return column;
  }
};

/**
 * UsersTable component for displaying user data
 * @param props UsersTable properties
 * @returns React component
 */
const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onMessage,
  onItem,
}) => {
  const { store } = useContext(Context);
  const isUserAdmin = store.user.role.name === 'Admin';
  const columns = UserHelpers.getFilteredTableColumns(isUserAdmin);
  
  return (
    <Table
      columns={columns}
      renderColumnHeader={(column) => formatColumnHeader(column)}
    >
      {users.length > 0 ? (
        users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.role.name}</TableCell>
            <TableCell>{user.userName}</TableCell>
            {columns.includes('email') && <TableCell>{user.email}</TableCell>}
            <TableCell>
              <TableActionButtons
                isAdmin={isUserAdmin}
                onEdit={onEdit && (() => onEdit(user))}
                onMessage={onMessage && (() => onMessage(user))}
                onItem={onItem && (() => onItem(user))}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <EmptyTableRow colSpan={columns.length} message="No users found" />
      )}
    </Table>
  );
};

export default UsersTable;
