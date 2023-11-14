import { CreateMovementModal } from '@/components/CreateMovementModal';
import { Button } from '@/components/common/Button';
import { RequestResultList } from '@/components/common/RequestResultList';
import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import { createMovement } from '@/services/movement';
import { NewMovement } from '@/types/movement';
import { Material } from '@prisma/client';
import React, { useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { MaterialMovementsDetails } from '@/components/MaterialMovementsDetails';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { LabeledSelect } from '@/components/common/LabeledSelect';
import { useUserId } from '@/hooks/useUserId';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

const InventoryPage = () => {
  const userId = useUserId() ?? '';
  const createMovementDialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { data: materials } = useSWR<Material[]>(
    `${API_ROUTES.materials}`,
    fetcher
  );

  const selectedMaterialId = router.query.material || null;
  const selectedMaterial = materials?.find(
    (material) => material.id === selectedMaterialId
  );
  const setSelectedMaterialId = (materialId: string) => {
    router.push({
      pathname: router.pathname,
      query: { material: materialId },
    });
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
            `${API_ROUTES.movements}?material=${selectedMaterialId}&expand=user`
          )
        );
    } catch (e) {} // eslint-disable-line no-empty
  };

  return (
    <>
      <h1 className='page-title'>Inventory management</h1>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='flex items-center justify-center py-2 gap-6'>
          <LabeledSelect
            label=''
            defaultValue={selectedMaterialId || 'default'}
            onChange={(e) => setSelectedMaterialId(e.target.value)}
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
          </LabeledSelect>
          <Button
            onClick={() => createMovementDialogRef.current?.showModal()}
            disabled={selectedMaterialId === null}
          >
            Add movement
          </Button>
        </div>

        {selectedMaterial ? (
          <>
            <MaterialMovementsDetails
              materialId={selectedMaterial.id}
              materialName={selectedMaterial.name}
            />
            <CreateMovementModal
              material={selectedMaterial}
              ref={createMovementDialogRef}
              onClose={() => createMovementDialogRef.current?.close()}
              onSubmit={handleCreateMovement}
            />
            <Toaster />
          </>
        ) : (
          <div className='container w-fit py-4 px-6 flex flex-col justify-center'>
            <p className='text-center text-neutral-700 p-20'>
              Please select a material <br /> to view its movements
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const ProtectedInventoryPage = () => (
  <ProtectedComponent allowedRoles={'any'}>
    <InventoryPage />
  </ProtectedComponent>
);

export default ProtectedInventoryPage;
