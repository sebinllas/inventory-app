import { CreateMaterialModal } from '@/components/CreateMaterialModal';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import { NewMaterial } from '@/types/material';
import { Material, User } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { createMaterial } from '@/services/material';
import { formatDateString } from '@/utils/date';
import { useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import Link from 'next/link';

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
      <h1 className='page-title'>Materials</h1>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='flex items-center justify-center py-2 gap-6'>
          <Button onClick={() => createDialogRef.current?.showModal()}>
            Add a new material
          </Button>
        </div>
        <div className='container w-fit mx-auto py-4 px-6'>
          <table>
            <thead>
              <tr>
                <th>Material id</th>
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
                loadingComponent={<LoadingComponent />}
                errorComponent={<ErrorComponent />}
                noDataComponent={<NoDataComponent />}
                itemRenderer={(material) => (
                  <tr key={material.id}>
                    <td>
                      <Link href={`/inventory?material=${material.id}`}>
                        {material.id}
                      </Link>
                    </td>
                    <td>
                      {formatDateString(
                        material.createdAt as unknown as string
                      )}
                    </td>
                    <td>{material.name}</td>
                    <td>{material.quantity}</td>
                    <td>{material.createdBy.name}</td>
                  </tr>
                )}
              />
            </tbody>
          </table>
        </div>
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

const LoadingComponent = () => (
  <tr className='text-center'>
    <td colSpan={5} className='mx-auto p-10'>
      <Loading />
    </td>
  </tr>
);

const ErrorComponent = () => (
  <tr className='text-center'>
    <td colSpan={5} className=' p-10'>
      Failed to load materials
    </td>
  </tr>
);

const NoDataComponent = () => (
  <tr className='text-center'>
    <td colSpan={5} className=' p-10'>
      No materials found
    </td>
  </tr>
);
