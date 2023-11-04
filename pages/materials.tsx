import { CreateMaterialModal } from '@/components/CreateMaterialModal';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/lib/api';
import { fetcher } from '@/lib/fetcher';
import { NewMaterial } from '@/types/NewMaterial';
import { Material, User } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { createMaterial } from '@/services/materials';
import { formatDateString } from '@/lib/date';
import { useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';

interface MaterialResponse
  extends Omit<Material, 'UserId' | 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

const MaterialPage = () => {
  const { data, error, isLoading } = useSWR<MaterialResponse[]>(
    `${API_ROUTES.materials}?expand=user`,
    fetcher
  );
  const userId = '1'; //hardcoded by now, will be dynamic later
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const handleCreateMaterial = async (newMaterial: NewMaterial) => {
    try {
      await toast
        .promise(createMaterial(newMaterial, userId), {
          loading: 'Adding material...',
          success: 'Material added',
          error: (error) => {
            return error.toString();
          },
        })
        .then(() => mutate(`${API_ROUTES.materials}?expand=user`));
    } catch (e) {} // eslint-disable-line no-empty
  };

  return (
    <>
      <h1 className='text-2xl text-emerald-600 font-bold text-center py-4'>
        Materials
      </h1>
      <div className='container w-fit mx-auto py-4 px-6'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Created at</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Created by</th>
            </tr>
          </thead>
          <tbody>
            <RequestResultList<MaterialResponse>
              data={data}
              isError={error}
              isLoading={isLoading}
              loadingComponent={
                <tr>
                  <td colSpan={5}>
                    <Loading />
                  </td>
                </tr>
              }
              errorComponent={
                <tr>
                  <td colSpan={5}>Failed to load materials</td>
                </tr>
              }
              noDataComponent={
                <tr>
                  <td colSpan={5}>No materials found</td>
                </tr>
              }
              itemRenderer={(material) => (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>
                    {formatDateString(material.createdAt as unknown as string)}
                  </td>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{material.createdBy.name}</td>
                </tr>
              )}
            />
          </tbody>
        </table>
        <footer className='flex justify-center mt-4'>
          <Button onClick={() => createDialogRef.current?.showModal()}>
            Add a new material
          </Button>
        </footer>
      </div>
      <CreateMaterialModal
        ref={createDialogRef}
        onSubmit={handleCreateMaterial}
        onClose={() => createDialogRef.current?.close()}
      />
      <Toaster />
    </>
  );
};

export default MaterialPage;
