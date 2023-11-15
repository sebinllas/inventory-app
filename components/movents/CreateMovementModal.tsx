/* eslint-disable prefer-arrow-callback */
import React, { FormEvent, ForwardedRef, forwardRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { LabeledInput } from '@/components/common/LabeledInput';
import { Enum_MovementType, Material } from '@prisma/client';
import { NewMovement } from '@/types/movement';
import { LabeledSelect } from '@/components/common/LabeledSelect';
import { Toaster } from 'react-hot-toast';

interface NewMovementFormProps {
  onSubmit: (material: NewMovement) => void;
  onClose: () => void;
  material: Material;
}

const RenderComponent = (
  { onSubmit, onClose, material }: NewMovementFormProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const typeSelect = e.currentTarget.elements.namedItem('type');
    const quantityInput = e.currentTarget.elements.namedItem('quantity');
    if (
      !(typeSelect instanceof HTMLSelectElement) ||
      !(quantityInput instanceof HTMLInputElement)
    )
      return;
    await onSubmit({
      quantity: parseInt(quantityInput.value),
      materialId: material.id,
      movementType: typeSelect.value,
    });
    setLoading(false);
    typeSelect.value = '';
    quantityInput.value = '';
  };

  return (
    <dialog className='dialog' ref={ref}>
      <form
        onSubmit={handleSubmit}
        className='container h-fit mx-auto bg-white p-4 gap-4 flex flex-col'
      >
        <h3 className='font-bold text-center'>
          Material <span className='text-emerald-600'>{material.name}</span>
        </h3>
        <fieldset className='flex flex-col gap-4'>
          <LabeledSelect
            label='Movement type'
            name='type'
            placeholder='In or OUT'
            required
            defaultValue=''
            className='rounded-lg bg-neutral-100 p-2'
          >
            <option value='' disabled></option>
            {Object.entries(Enum_MovementType).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </LabeledSelect>
          <LabeledInput
            label='Quantity'
            type='number'
            name='quantity'
            placeholder='25'
            required
            min={1}
          />
          <div className='flex gap-2 justify-center'>
            <Button type='submit' loading={loading}>
              Submit
            </Button>
            <Button styleType='secondary' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </fieldset>
      </form>
      <Toaster position='top-left' />
    </dialog>
  );
};

export const CreateMovementModal = forwardRef(RenderComponent);
