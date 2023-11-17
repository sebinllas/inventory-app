/* eslint-disable prefer-arrow-callback */
import { NewMaterial } from '@/types/material';
import React, { FormEvent, ForwardedRef, forwardRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { LabeledInput } from '@/components/common/LabeledInput';
import { Toaster } from 'react-hot-toast';

interface NewMaterialFormProps {
  onSubmit: (material: NewMaterial) => Promise<void>;
  onClose: () => void;
}

const RenderComponent = (
  { onSubmit, onClose }: NewMaterialFormProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const nameInput = e.currentTarget.elements.namedItem('name');
    const quantityInput = e.currentTarget.elements.namedItem('quantity');
    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(quantityInput instanceof HTMLInputElement)
    )
      return;
    await onSubmit({
      name: nameInput.value,
      quantity: parseInt(quantityInput.value),
    });
    setLoading(false);
    nameInput.value = '';
    quantityInput.value = '';
  };

  return (
    <dialog className='dialog' ref={ref}>
      <form
        onSubmit={handleSubmit}
        className='container mx-auto flex h-fit flex-col items-center gap-4 bg-white p-4'
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
          <Button type='submit' loading={loading}>
            Submit
          </Button>
          <Button styleType='secondary' onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
      <Toaster position='top-left' />
    </dialog>
  );
};

export const CreateMaterialModal = forwardRef(RenderComponent);
