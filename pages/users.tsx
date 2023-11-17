import { EditUserForm } from '@/components/users/EditUserForm';
import { Loading } from '@/components/common/Loading';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { updateUser } from '@/services/user';
import { UserResponse } from '@/types/user';
import { fetcher } from '@/utils/fetcher';
import { Enum_RoleName } from '@prisma/client';
import { FormEvent, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { IconEdit } from '@tabler/icons-react';
import { UserCell } from '@/components/users/userCell';
import { Page401 } from './401';

const UsersPage = () => {
  const { data, error, isLoading } = useSWR<UserResponse[]>(
    API_ROUTES.users,
    fetcher
  );
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    setLoading(false);
    mutate(API_ROUTES.users);
  };

  return (
    <>
      <h1 className='page-title'>Users</h1>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className='container mx-auto w-fit px-6 py-4'>
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
                  <UserCell
                    user={user}
                    actionElement={
                      <button
                        onClick={() => {
                          setUserToEdit(user);
                          editUserDialog.current?.showModal();
                        }}
                      >
                        <IconEdit />
                      </button>
                    }
                  />
                )}
              />
            </tbody>
          </table>
        </div>
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
          loading={loading}
        />
        <Toaster position='top-left' />
      </dialog>
    </>
  );
};

const ProtectedUserPage = () => (
  <ProtectedComponent allowedRoles={['ADMIN']} fallback={<Page401 />}>
    <UsersPage />
  </ProtectedComponent>
);

export default ProtectedUserPage;

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
