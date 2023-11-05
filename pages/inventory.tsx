import { CreateMovementModal } from '@/components/CreateMovementModal';
import { Button } from '@/components/common/Button';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import { createMovement } from '@/services/movement';
import { NewMovement } from '@/types/movement';
import { Material } from '@prisma/client';
import React, { useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { MaterialMovementsTable } from '@/components/MaterialMovementsTable';
import toast, { Toaster } from 'react-hot-toast';

const InventoryPage = () => {
  const userId = '1'; //hardcoded by now, will be dynamic later
  const createMovementDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const { data: materials } = useSWR<Material[]>(
    `${API_ROUTES.materials}`,
    fetcher
  );

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const material = materials?.find(
      (material) => material.id === e.target.value
    );
    setSelectedMaterial((prevMaterial) => (material ? material : prevMaterial));
  };

  const handleCreateMovement = async (newMovement: NewMovement) => {
    try {
      await toast
        .promise(createMovement(newMovement, userId), {
          loading: 'Adding movement...',
          success: 'Movement added',
          error: (error) => {
            return error.toString();
          },
        })
        .then(() =>
          mutate(
            `${API_ROUTES.movements}?material=${selectedMaterial?.id}&expand=user`
          )
        );
    } catch (e) {} // eslint-disable-line no-empty
  };

  return (
    <>
      <h1 className='page-title'>Inventory management</h1>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='flex items-center justify-center py-2 gap-6'>
          <select
            defaultValue='default'
            className='rounded-lg bg-neutral-100 p-2'
            onChange={handleMaterialChange}
          >
            <option value='default' disabled>
              Select a material
            </option>
            <RequestResultList<Material>
              data={materials}
              itemRenderer={(material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              )}
            />
          </select>
          <Button
            onClick={() => createMovementDialogRef.current?.showModal()}
            disabled={selectedMaterial === null}
          >
            Add movement
          </Button>
        </div>
        <div className='container w-fit py-4 px-6 flex flex-col justify-center'>
          {selectedMaterial ? (
            <>
              <MaterialMovementsTable materialId={selectedMaterial.id} />
              <CreateMovementModal
                material={selectedMaterial}
                ref={createMovementDialogRef}
                onClose={() => createMovementDialogRef.current?.close()}
                onSubmit={handleCreateMovement}
              />
              <Toaster />
            </>
          ) : (
            <div>
              <p className='text-center text-neutral-700 p-20'>
                Please select a material <br /> to view its movements
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryPage;