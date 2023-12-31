import { Enum_RoleName } from '@prisma/client';
import { FormEvent } from 'react';
import { LabeledSelect } from '@/components/common/LabeledSelect';
import { Button } from '@/components/common/Button';

interface EditUserFormProps {
  userToEdit: { email: string; role?: Enum_RoleName };
  onSubmit: (user: { email: string; role: Enum_RoleName }) => void;
  onCancel: () => void;
  loading?: boolean;
  onUserChange: (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement>
  ) => void;
}

export const EditUserForm = ({
  userToEdit,
  onSubmit,
  onCancel,
  onUserChange,
  loading = false,
}: EditUserFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roleSelect = e.currentTarget.elements.namedItem('role');
    if (roleSelect instanceof HTMLSelectElement && userToEdit !== undefined) {
      const editedUser = {
        ...userToEdit,
        role: roleSelect.value as Enum_RoleName,
      };
      onSubmit(editedUser);
    }
  };
  return (
    <form
      className='container mx-auto flex h-fit flex-col gap-4 bg-white p-4'
      onSubmit={handleSubmit}
    >
      <h3 className='text-center font-bold'>
        User email:{' '}
        <span className='text-emerald-600'>{userToEdit?.email}</span>
      </h3>
      <LabeledSelect
        label='Role'
        value={userToEdit?.role || ''}
        name='role'
        onChange={onUserChange}
      >
        <option disabled value=''>
          NONE
        </option>
        {Object.values(Enum_RoleName).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </LabeledSelect>
      <div className='flex justify-center gap-2'>
        <Button type='submit' loading={loading}>
          Save
        </Button>
        <Button type='button' onClick={() => onCancel()} styleType='secondary'>
          Cancel
        </Button>
      </div>
    </form>
  );
};
