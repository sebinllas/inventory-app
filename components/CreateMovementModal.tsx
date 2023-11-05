/* eslint-disable prefer-arrow-callback */
import React, { FormEvent, ForwardedRef, forwardRef } from 'react';
import { Button } from './common/Button';
import { LabeledInput } from './common/LabeledInput';
import { Enum_MovementType, Material } from '@prisma/client';
import { NewMovement } from '@/types/movement';

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
    <dialog
      className='fixed bottom-1/2 z-50 bg-transparent backdrop:backdrop-blur-sm'
      ref={ref}
    >
      <h2>{material.name}</h2>
      <form
        method='dialog'
        onSubmit={handleSubmit}
        className='container flex flex-col gap-4 h-fit p-4 mx-auto bg-white'
      >
        <label className='flex flex-col'>
          <span>Movement type</span>
          <select
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
          </select>
        </label>
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
      </form>
    </dialog>
  );
};

export const CreateMovementModal = forwardRef(renderComponent);
