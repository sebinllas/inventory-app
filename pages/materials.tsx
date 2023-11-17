import { CreateMaterialModal } from '@/components/materials/CreateMaterialModal';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import { NewMaterial } from '@/types/material';
import { Material, User } from '@prisma/client';
import toast from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { createMaterial } from '@/services/material';
import { formatDateString } from '@/utils/date';
import { useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import Link from 'next/link';
import { useUserId } from '@/hooks/useUserId';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { Page401 } from './401';

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
  const userId = useUserId() ?? '';
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => modalRef.current?.close();

  const handleCreateMaterial = async (newMaterial: NewMaterial) => {
    try {
      await toast.promise(createMaterial(newMaterial, userId), {
        loading: 'Adding material...',
        success: 'Material added',
        error: (error) => {
          return error.toString();
        },
      });
      mutate(`${API_ROUTES.materials}?expand=user`);
      closeModal();
    } catch (e) {} // eslint-disable-line no-empty
  };

  return (
    <>
      <h1 className='page-title'>Materials</h1>
      <div className='flex flex-col items-center justify-center gap-6'>
        <ProtectedComponent>
          <div className='flex items-center justify-center gap-6 py-2'>
            <Button onClick={() => modalRef.current?.showModal()}>
              Add a new material
            </Button>
          </div>
        </ProtectedComponent>
        <div className='container mx-auto w-fit px-6 py-4'>
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
              <RequestResultList
                data={data}
                isError={error}
                isLoading={isLoading}
                itemRenderer={materialRenderer}
                loadingComponent={<LoadingComponent />}
                errorComponent={<ErrorComponent />}
                noDataComponent={<NoDataComponent />}
              />
            </tbody>
          </table>
        </div>
      </div>
      <CreateMaterialModal
        ref={modalRef}
        onSubmit={handleCreateMaterial}
        onClose={closeModal}
      />
    </>
  );
};

const ProtectedMaterialPage = () => (
  <ProtectedComponent allowedRoles={'any'} fallback={<Page401 />}>
    <MaterialPage />
  </ProtectedComponent>
);

export default ProtectedMaterialPage;

const materialRenderer = (material: MaterialResponse) => (
  <tr key={material.id}>
    <td>
      <Link href={`/inventory?material=${material.id}`}>{material.id}</Link>
    </td>
    <td>{formatDateString(material.createdAt as unknown as string)}</td>
    <td>{material.name}</td>
    <td>{material.quantity}</td>
    <td>{material.createdBy.name}</td>
  </tr>
);

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
