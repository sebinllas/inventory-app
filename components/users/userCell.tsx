import { UserResponse } from '@/types/user';
import { ReactNode } from 'react';
import { RoleChip } from './RoleChip';

interface UserCellProps {
  user: UserResponse;
  actionElement: ReactNode;
}
export const UserCell = ({ user, actionElement }: UserCellProps) => {
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <RoleChip role={user.role} />
      </td>
      <td>{actionElement}</td>
    </tr>
  );
};
