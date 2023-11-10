import { EditUserForm } from '@/components/EditUserForm';
import { Loading } from '@/components/common/Loading';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { updateUser } from '@/services/user';
import { UserResponse } from '@/types/user';
import { fetcher } from '@/utils/fetcher';
import { Enum_RoleName } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import { FormEvent, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';

const UsersPage = () => {
  const { data, error, isLoading } = useSWR<UserResponse[]>(
    API_ROUTES.users,
    fetcher
  );
  const editUserDialog = useRef<HTMLDialogElement>(null);
  const [userToEdit, setUserToEdit] = useState<UserResponse | undefined>(
    undefined
  );
  const handleUserChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement>
  ) => {
    if (userToEdit === undefined) return;
    if (e.currentTarget.name === 'role') {
      setUserToEdit({
        ...userToEdit,
        role: e.currentTarget.value as Enum_RoleName,
      });
    }
  };
  const handleSubmit = async (user: { email: string; role: Enum_RoleName }) => {
    if (!userToEdit) return;
    await toast.promise(
      updateUser(userToEdit.id, {
        role: user.role,
      }),
      {
        loading: 'Updating user...',
        success: () => {
          editUserDialog.current?.close();
          return 'User updated';
        },
        error: 'Failed to update user',
      }
    );
    mutate(API_ROUTES.users);
  };

  return (
    <>
      <h1 className='page-title'>Users</h1>
      <div className='container w-fit mx-auto py-4 px-6'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <RequestResultList
              data={data}
              isError={error}
              isLoading={isLoading}
              loadingComponent={<LoadingComponent />}
              noDataComponent={<NoDataComponent />}
              errorComponent={<ErrorComponent />}
              itemRenderer={(user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <RoleBadge role={user.role} />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUserToEdit(user);
                        editUserDialog.current?.showModal();
                      }}
                    >
                      <IconEdit />
                    </button>
                  </td>
                </tr>
              )}
            />
          </tbody>
        </table>
      </div>
      <dialog className='dialog' ref={editUserDialog}>
        <EditUserForm
          userToEdit={{
            email: userToEdit?.email || '',
            role: userToEdit?.role,
          }}
          onUserChange={handleUserChange}
          onSubmit={handleSubmit}
          onCancel={() => editUserDialog.current?.close()}
        />
      </dialog>
      <Toaster />
    </>
  );
};

export default UsersPage;

const RoleBadge = ({ role }: { role: Enum_RoleName | undefined }) => {
  const rolesColors = {
    [Enum_RoleName.ADMIN]: 'bg-emerald-100 text-emerald-800',
    [Enum_RoleName.USER]: 'bg-amber-100 text-amber-800',
  };
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-fit mt-1 ${
        role ? rolesColors[role] : 'bg-gray-100 text-gray-800'
      }`}
    >
      {role || 'NONE'}
    </span>
  );
};

const LoadingComponent = () => {
  return (
    <tr>
      <td colSpan={5} className='mx-auto p-10'>
        <Loading />
      </td>
    </tr>
  );
};

const NoDataComponent = () => {
  return (
    <tr className='text-center'>
      <td colSpan={5} className=' p-10'>
        There are no users
      </td>
    </tr>
  );
};

const ErrorComponent = () => {
  return (
    <tr className='text-center'>
      <td colSpan={5} className=' p-10'>
        Failed to load users
      </td>
    </tr>
  );
};
