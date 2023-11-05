/* eslint-disable prefer-arrow-callback */
import { NewMaterial } from '@/types/material';
import React, { FormEvent, ForwardedRef, forwardRef } from 'react';
import { Button } from './common/Button';
import { LabeledInput } from './common/LabeledInput';

interface NewMaterialFormProps {
  onSubmit: (material: NewMaterial) => void;
  onClose: () => void;
}

const renderComponent = (
  { onSubmit, onClose }: NewMaterialFormProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const nameInput = e.currentTarget.elements.namedItem('name');
    const quantityInput = e.currentTarget.elements.namedItem('quantity');
    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(quantityInput instanceof HTMLInputElement)
    )
      return;
    onSubmit({
      name: nameInput.value,
      quantity: parseInt(quantityInput.value),
    });
    nameInput.value = '';
    quantityInput.value = '';
  };

  return (
    <dialog
      className='fixed bottom-1/2 z-50 bg-transparent backdrop:backdrop-blur-sm'
      ref={ref}
    >
      <form
        method='dialog'
        onSubmit={handleSubmit}
        className='container flex flex-col items-center gap-4 h-fit p-4 mx-auto bg-white'
      >
        <LabeledInput
          label='Name'
          type='text'
          name='name'
          placeholder='Cement'
          required
        />
        <LabeledInput
          label='Quantity'
          type='number'
          name='quantity'
          placeholder='25'
          required
        />
        <div className='flex gap-2'>
          <Button type='submit'>Submit</Button>
          <Button styleType='secondary' onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export const CreateMaterialModal = forwardRef(renderComponent);
