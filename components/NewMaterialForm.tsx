import { NewMaterial } from '@/types/NewMaterial';
import React from 'react';
import { Button } from './common/Button';

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
		<form onSubmit={handleSubmit}>
			<label className='flex flex-col'>
				<span>Name</span>
				<input type='text' name='name' required />
			</label>
			<label className='flex flex-col'>
				<span>Quantity</span>
				<input type='number' name='quantity' required />
			</label>
			<Button type='submit'>Submit</Button>
		</form>
	);
};
