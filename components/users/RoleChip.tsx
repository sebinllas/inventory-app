import { Enum_RoleName } from '@prisma/client';
import { Chip } from '@/components/common/Chip';

export const RoleChip = ({ role }: { role: Enum_RoleName | undefined }) => {
  const rolesColors = {
    [Enum_RoleName.ADMIN]: 'bg-emerald-100 text-emerald-800',
    [Enum_RoleName.USER]: 'bg-amber-100 text-amber-800',
  };
  return (
    <Chip className={role ? rolesColors[role] : 'bg-gray-200'}>
      {role ?? 'NONE'}
    </Chip>
  );
};
