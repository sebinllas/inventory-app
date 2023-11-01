import { NewMaterialForm } from '@/components/NewMaterialForm';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/lib/api';
import { fetcher } from '@/lib/fetcher';
import { NewMaterial } from '@/types/NewMaterial';
import { Material, User } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { createMaterial } from '@/services/materials';
import { formatDateString } from '@/lib/date';

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
      <div className='flex flex-wrap gap-6'>
        <div className='rounded-lg border-slate-300 border overflow-hidden w-fit mx-auto'>
          <table className='[&_td]:p-2 [&_th]:p-2 divide-y divide-slate-300'>
            <thead className='bg-neutral-200'>
              <tr className='text-left divide-x divide-slate-300'>
                <th>Id</th>
                <th>Created at</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Created by</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-300'>
              <RequestResultList<MaterialResponse>
                data={data}
                isError={error}
                isLoading={isLoading}
                errorComponent={
                  <tr>
                    <td colSpan={4}>Failed to load materials</td>
                  </tr>
                }
                loadingComponent={
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                }
                noDataComponent={
                  <tr>
                    <td colSpan={4}>No materials found</td>
                  </tr>
                }
                itemRenderer={(material) => (
                  <tr key={material.id} className='divide-x divide-slate-300'>
                    <td>{material.id}</td>
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
        <NewMaterialForm onSubmit={handleCreateMaterial} />
        <Toaster />
      </div>
    </>
  );
};

export default MaterialPage;
