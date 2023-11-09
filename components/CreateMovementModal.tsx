/* eslint-disable prefer-arrow-callback */
import React, { FormEvent, ForwardedRef, forwardRef } from 'react';
import { Button } from './common/Button';
import { LabeledInput } from './common/LabeledInput';
import { Enum_MovementType, Material } from '@prisma/client';
import { NewMovement } from '@/types/movement';
import { LabeledSelect } from './common/LabeledSelect';

interface NewMovementFormProps {
  onSubmit: (material: NewMovement) => void;
  onClose: () => void;
  material: Material;
}

const renderComponent = (
  { onSubmit, onClose, material }: NewMovementFormProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const typeSelect = e.currentTarget.elements.namedItem('type');
    const quantityInput = e.currentTarget.elements.namedItem('quantity');
    if (
      !(typeSelect instanceof HTMLSelectElement) ||
      !(quantityInput instanceof HTMLInputElement)
    )
      return;
    onSubmit({
      quantity: parseInt(quantityInput.value),
      materialId: material.id,
      movementType: typeSelect.value,
    });
    typeSelect.value = '';
    quantityInput.value = '';
  };

  return (
    <dialog className='dialog' ref={ref}>
      <form
        method='dialog'
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
            <Button type='submit'>Submit</Button>
            <Button styleType='secondary' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
};

export const CreateMovementModal = forwardRef(renderComponent);
