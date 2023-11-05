import { API_ROUTES } from '@/constants/api';
import { NewMaterial } from '@/types/material';

export const createMaterial = async (
	newMaterial: NewMaterial,
	userId: string
) => {
	const response = await fetch(API_ROUTES.materials, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...newMaterial, userId: userId }),
	});
	if (!response.ok) {
		const { details } = await response.json();
		throw new Error(details);
	}
};
