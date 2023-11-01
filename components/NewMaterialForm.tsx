import { NewMaterial } from '@/types/NewMaterial';
import React from 'react';
import { Button } from './common/Button';
import { LabeledInput } from './common/LabeledInput';

interface NewMaterialFormProps {
  onSubmit: (material: NewMaterial) => void;
}

export const NewMaterialForm = ({ onSubmit }: NewMaterialFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form
      className='flex flex-col items-center gap-4 rounded-lg border border-slate-300 h-fit p-4 mx-auto'
      onSubmit={handleSubmit}
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
      <Button type='submit' className='grow-0'>Submit</Button>
    </form>
  );
};
