import { Enum_RoleName } from '@prisma/client';
import { FormEvent } from 'react';
import { LabeledSelect } from './common/LabeledSelect';
import { Button } from './common/Button';

interface EditUserFormProps {
  userToEdit: { email: string; role?: Enum_RoleName };
  onSubmit: (user: { email: string; role: Enum_RoleName }) => void;
  onCancel: () => void;
  onUserChange: (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement>
  ) => void;
}

export const EditUserForm = ({
  userToEdit,
  onSubmit,
  onCancel,
  onUserChange,
}: EditUserFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      method='dialog'
      className='container flex flex-col gap-4 h-fit p-4 mx-auto bg-white'
      onSubmit={handleSubmit}
    >
      <h3 className='font-bold text-center'>
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
      <div className='flex gap-2 justify-center'>
        <Button type='submit'>Save</Button>
        <Button type='button' onClick={() => onCancel()} styleType='secondary'>
          Cancel
        </Button>
      </div>
    </form>
  );
};
